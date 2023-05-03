<script setup>
import { reactive, onMounted,inject } from "vue";
const socket = inject('socket')

var servers = []

const data = reactive({
    servers:[]
})

socket.on('connect', () => {
    console.log('Connected!')
    socket.emit('initList','Client needs information!')
})

socket.on('recvList', (res) => {
    console.log(res)
})

socket.on('flashInfo', (res) => {
    if (res) {
        var temp = []
        Object.keys(res).forEach((key) => {
            temp.push(res[key])
        })
        data.servers = temp
        //console.log(temp)
    }
})

var interval = setInterval(() => {
    socket.emit('live')
}, 200)

socket.on('stopLive', () => {
    clearInterval(interval)
})

</script>

<template>
    <el-card v-for="item in data.servers" :key="item.name" style="min-height:600px;margin-bottom:20px;">
        <el-container style="width:100%;height:100%;">
            <el-row type="flex" justify="center" style="width:100%;">
                <el-col :span="8" style="height:100%;">
                    <el-row style="height:auto;">
                        <el-col>
                            <h2><el-icon><House /></el-icon> Node</h2>
                        </el-col>
                        <el-col>
                            <el-text type="primary">{{ item.name }}</el-text>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <h2><el-icon><SwitchButton /></el-icon> Status</h2>
                            <el-text v-if="item.status=='online'" type="success">{{ item.status }}</el-text>
                            <el-text v-if="item.status=='outline'" type="danger">{{ item.status }}</el-text>
                        </el-col>
                    </el-row>
                    <el-row style="height:auto;">
                        <el-col>
                            <h2><el-icon><Clock /></el-icon> System Time</h2>
                        </el-col>
                        <el-col>
                            <el-text type="info">{{ item.info.time.sysTime }}</el-text>
                        </el-col>
                    </el-row>
                    <el-row style="height:auto;">
                        <el-col>
                            <h2><el-icon><Cpu /></el-icon> CPU</h2>
                        </el-col>
                        <el-col>
                            <span>Usage</span>: <el-text type="danger">{{ item.info.cpu.usage }}</el-text><br/>
                            <span>Number</span>: <el-text>{{ item.info.cpu.number }}</el-text>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <h2><el-icon><Reading /></el-icon> Memory</h2>
                        </el-col>
                        <el-col>
                            <span>Total</span>: {{ item.info.memory.totalMemory }}<br/>
                            <span>Free</span>: {{ item.info.memory.freeMemory }}<br/>
                            <span>Used</span>: {{ item.info.memory.usedMemory }}
                        </el-col>
                    </el-row>
                </el-col>
            
                <el-col :span="16">
                    <el-row>
                        <el-col>
                            <h2><el-icon><DataLine /></el-icon> System</h2>
                        </el-col>
                        <el-col>
                            <el-descriptions border :column="1">
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            Platform
                                        </div>
                                    </template>
                                    {{ item.info.system.platform }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            Hostname
                                        </div>
                                    </template>
                                    {{ item.info.system.hostname }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            Distro
                                        </div>
                                    </template>
                                    {{ item.info.system.distro }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            Arch
                                        </div>
                                    </template>
                                    {{ item.info.system.arch }}
                                </el-descriptions-item>
                                <el-descriptions-item v-if="item.info.system.codename != ''">
                                    <template #label>
                                        <div class="cell-item">
                                            Codename
                                        </div>
                                    </template>
                                    {{ item.info.system.codename }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            SysUpTime
                                        </div>
                                    </template>
                                    {{ item.info.time.sysUpTime.days }}d
                                    {{ item.info.time.sysUpTime.hours }}h
                                    {{ item.info.time.sysUpTime.minutes }}m
                                    {{ item.info.time.sysUpTime.seconds }}s
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            CliUpTime
                                        </div>
                                    </template>
                                    {{ item.info.time.processUpTime.days }}d
                                    {{ item.info.time.processUpTime.hours }}h
                                    {{ item.info.time.processUpTime.minutes }}m
                                    {{ item.info.time.processUpTime.seconds }}s
                                    
                                </el-descriptions-item>
                            </el-descriptions>
                            
                        </el-col>
                    </el-row>

                    <el-row>
                        <h2><el-icon><Files /></el-icon> Disk</h2>
                        <el-table :data="item.info.disk">
                            <el-table-column label="fs" prop="fs"/>
                            <el-table-column label="mount" prop="mount"/>
                            <el-table-column label="type" prop="type"/>
                            <el-table-column label="size" prop="size" />
                            <el-table-column label="used" prop="used" />
                        </el-table>
                    </el-row>
                    
                    <el-row>
                        <h2><el-icon><Sort /></el-icon> Network</h2>
                        <el-table :data="item.info.network">
                            <el-table-column label="interface" prop="iface"/>
                            <el-table-column label="operstate" prop="operstate" />
                            <el-table-column label="rx_bytes" prop="rx_bytes"/>
                            <el-table-column label="tx_bytes" prop="tx_bytes"/>
                            <el-table-column label="rx_sec" prop="rx_sec"/>
                            <el-table-column label="tx_sec" prop="tx_sec"/>
                        </el-table>
                    </el-row>
                </el-col>
            </el-row>
        </el-container>
    </el-card>
</template>

<style scoped>

.el-col{
    font-size:16px;
}
.el-col span{
    font-weight: 600;
    font-size:16px;
}

.cell-item {
  display: flex;
  align-items: center;
}
</style>
