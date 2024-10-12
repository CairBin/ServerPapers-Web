<script setup lang="ts">
import { reactive } from 'vue';
import { getHash, HashType } from '../utils/Hash';
import {ElMessage} from 'element-plus';
import {useRouter} from 'vue-router';

const data = reactive({
    formData:{
        user:'',
        URL: '',
        token: '',
        hash: HashType.SM3,
        auth:true,
    },
    select:'http://'
})

const router = useRouter();

const connectServer = ()=>{
    const url:string = data.select+data.formData.URL;
    const token:string = getHash(data.formData.token, 
                    data.formData.hash);
    if(!data.formData.user){
        ElMessage.error('User is required');
        return;
    }

    if(!data.formData.URL){
        ElMessage.error('URL is required');
        return;
    }

    if(!data.formData.token){
        ElMessage.error('Token is required');
        return;
    }
    
    window.localStorage.setItem('token', token);
    router.push({
        name:'home',
        state:{
            params:{
                user:data.formData.user,
                token: token,
                url:url,
                rejectUnauthorized: data.formData.auth?1:0,
            }
        }
    });
    
}

</script>

<template>
    <el-card class="login-card">
        <h2>Connect to ServerPapers</h2>
        <el-form :model="data.formData" label-width="60" label-position="right">
            <el-form-item label="User">
                <el-input v-model="data.formData.user" placeholder="Please enter username">
                </el-input>
            </el-form-item>
            <el-form-item label="URL" >
                <el-input v-model="data.formData.URL" placeholder="Please enter URL">
                    <template #prepend>
                        <el-select v-model="data.select" style="width:100px">
                            <el-option value="http://">http://</el-option>
                            <el-option value="https://">https://</el-option>
                        </el-select>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="Token">
                <el-input v-model="data.formData.token" placeholder="Please enter token and select hash algorithm" type="password">
                    <template #prepend>
                        <el-select v-model="data.formData.hash" style="width:100px">
                            <el-option :value="HashType.MD5">MD5</el-option>
                            <el-option :value="HashType.SHA256">SHA256</el-option>
                            <el-option :value="HashType.SM3">SM3</el-option>
                        </el-select>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="Auth">
                <el-switch v-model="data.formData.auth">
                </el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="connectServer()">
                    Connect
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style>
.login-card {
    width: 600px;
    height: auto;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
}
</style>