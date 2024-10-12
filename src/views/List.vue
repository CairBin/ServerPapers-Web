<script setup lang="ts">
import {ElMessage} from 'element-plus';
import {io} from 'socket.io-client';
import {useRouter} from 'vue-router';
import {reactive} from 'vue';
import Example from '../components/Example.vue';

const router = useRouter();

const data = reactive({
    clientInfo:new Map<string,any>(),
    isLog:false,
});

const user = history.state.params.user;
const url = history.state.params.url;
const token = history.state.params.token;
const rejectUnauthorized = history.state.params.rejectUnauthorized===0?false:true;

ElMessage({
        type: 'warning',
        message:'Try to establish the connection...'
    });
const timer = setInterval(() => {
    ElMessage({
        type: 'warning',
        message:'Try to establish the connection...'
    });
}, 3000);


let errorCount = 0;

const socket = io(url as any as string, {
    transports:['websocket'],
    rejectUnauthorized
});

socket.on('connect', ()=>{
    clearInterval(timer);
    errorCount = 0;
    ElMessage({
        type:'success',
        message:'Connected to the server!'
    });

    socket.emit('hello',{
        flag:'web',
        user,
        token,
        data:''
    });
});



socket.on('clientInfo',(message)=>{
    if(!message || !message.user)
        return;

    data.clientInfo.set(message.user, message.data);
    if(data.isLog)
        console.log(JSON.stringify(message.data));
});


socket.on('disconnect', ()=>{
    ElMessage({type:'warning', message:'The connectiong has been closed!'});
    window.localStorage.removeItem('token');
})


socket.on('connect_error',(err)=>{
    ElMessage({
        type:'error',
        message:`${err}`
    })
    errorCount++;
    if(errorCount >= 3){
        ElMessage({type:'error', message:'Too many errors!'});
        clearInterval(timer);
        errorCount = 0;
        
        socket.disconnect();
        socket.close();
        window.localStorage.removeItem('token');
        router.push({name:'login'});
    }
});

const closeSocket = ()=>{
    ElMessage({type:'warning', message:'Closing the connection...'});
    clearInterval(timer);
    errorCount = 0;
        
    socket.disconnect();
    socket.close();
    window.localStorage.removeItem('token');
    router.push({name:'login'});
}
</script>

<template>
    <el-col class="panel-col" style="width:100%;">
        <el-row justify="space-between" style="width:100%">
            <div>
                Log in console <el-switch v-model="data.isLog"></el-switch>
            </div>
            <div>
                <el-button type="danger" @click="closeSocket">Disconnect</el-button>
            </div>
        </el-row>
    </el-col>
    <el-col v-for="(item,key) in data.clientInfo" :key="key" class="panel-col" style="width:100%">
        <el-card style="width:100%;">
            <Example :user="item[0]" :data="item[1]"></Example>
        </el-card>
    </el-col>
</template>

<style>
.info-card{
    height:100%;
    margin-bottom:5px;
    width:100%;
}

.info-card-container{
    width:100%;
    height:100%;
}

.panel-col{
    font-size:16px;
    margin-bottom:10px;
}
.panel-col span{
    font-weight: 600;
    font-size:16px;
}

.cell-item {
  display: flex;
  align-items: center;
}
</style>