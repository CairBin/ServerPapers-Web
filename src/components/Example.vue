<template>
    <div class="dashboard">
        <h1 @click="data.isShow=!data.isShow" style="cursor: pointer;">
          <el-icon><HomeFilled /></el-icon>Host {{ `"${props.user}"` }} Information 
          <el-icon v-if="!data.isShow"><ArrowRight /></el-icon><el-icon v-if="data.isShow"><ArrowDown /></el-icon>
          
        </h1>
        <div class="cards" v-if="data.isShow">
            <div class="card">
                <h3><el-icon><HomeFilled /></el-icon> System</h3>
                <p>Hostname: {{props.data.system.hostname}}</p>
                <p>Platform: {{props.data.system.platform}}</p>
                <p>Arch: {{props.data.system.arch}}</p>
                <p>Distro: {{props.data.system.distro}}</p>
                <p>Codename: {{props.data.system.codename}}</p>

                <h3><el-icon><Clock /></el-icon> System Time</h3>
                <p>System: {{props.data.time.systemTime}}</p>
                <p>System Up: {{props.data.time.systemUpTime.days+'d ' + props.data.time.systemUpTime.hours + 'h ' + props.data.time.systemUpTime.minutes + 'm ' + props.data.time.systemUpTime.seconds + 's'}}</p>
                <p>Process Up: {{props.data.time.processUpTime.days+'d ' + props.data.time.processUpTime.hours + 'h ' + props.data.time.processUpTime.minutes + 'm ' + props.data.time.processUpTime.seconds + 's'}}</p>
            </div>

          <div class="card">
            <h3><el-icon><Cpu /></el-icon> CPU Utility</h3>
            <p>Used: {{props.data.cpu.usage}}</p>
            <p>Cores: {{props.data.cpu.number}}</p>
            <v-chart :option="cpuOptions" style="height: 300px;"></v-chart>
          </div>
          <div class="card">
            <h3><el-icon><Finished /></el-icon> Memory</h3>
            <p>Total: {{ props.data.memory.totalMemory }}</p>
            <p>Used: {{ props.data.memory.usedMemory }}</p>
            <p>Free: {{ props.data.memory.freeMemory }}</p>
            <v-chart :option="memoryOptions"></v-chart>
          </div>
          <div class="card" style="width:auto;">
            <h3><el-icon><Switch /></el-icon> Network Flow</h3>
            <div class="cards">
              <div v-for="(dev, index) in props.data.network.device" :key="index" style="margin-bottom:20px;" class="card">
                <p><el-icon><Postcard /></el-icon> Device: {{ dev.name }} ({{ props.data.network.device[0].operstate }})</p>
                <p>Receiving Rate: {{ dev.rxSec }} bytes/sec</p>
                <p>Sending Rate: {{ dev.txSec }} bytes/sec</p>
              </div>
            </div>
          </div>
          <div class="card" style="width:auto;">
            <h3><el-icon><FolderOpened /></el-icon> Disk</h3>
            <div class="cards">
              <div v-for="(disk, index) in props.data.disk.areas" :key="index" style="margin-bottom:20px;" class="card">
                <p><el-icon><Guide /></el-icon> Area: {{disk.fs}}</p>
                <p>Mount: {{ disk.mount }}</p>
                <p>Type:{{disk.type}}</p>
                <p>Used: {{ disk.used }} / {{ disk.total }} ({{ disk.type }})</p>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import {ref, defineProps,reactive} from 'vue';

const data = reactive({
  isShow:false,
})

const props = defineProps<{
  data:any,
  user:string,
}>();



// 处理 CPU 数据
const cpuOptions = ref({
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: 'CPU',
      type: 'pie',
      radius: '50%',
      data: [
        { value: parseFloat(props.data.cpu.usage), name: 'Used' },
        { value: 100 - parseFloat(props.data.cpu.usage), name: 'Free' },
      ],
    },
  ],
});

// 处理内存数据
const memoryOptions = ref({
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: 'Memory',
      type: 'pie',
      radius: '50%',
      data: [
        { value: parseFloat(props.data.memory.usedMemory), name: 'Used' },
        { value: parseFloat(props.data.memory.totalMemory) - parseFloat(props.data.memory.usedMemory), name: 'Free' },
      ],
    },
  ],
});

</script>

<style scoped>
.dashboard {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  padding: 20px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content:center;
}

.card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 360px;
  text-align: left;
}

.card h3 {
  margin-bottom: 10px;
  font-size: 1.2em;
}

.card p {
  margin: 5px 0;
}
</style>