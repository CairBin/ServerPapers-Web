<script setup lang="ts">
import List from './List.vue';

</script>


<template>
    <el-container style="height:100%;width:100%;">
        <el-header>
            <h1>ServerPapers</h1>
        </el-header>
        <el-main>
            <List></List>
        </el-main>
        <el-footer>
            <div class="footer-info">
                <div class="badge">
                    <span class="badge-sub">
                        Github
                    </span>
                    <a href="https://github.com/CairBin/ServerPapers" target="_blank">
                        <span class="badge-value" id="badge-github-value">
                            ServerPapers
                        </span>
                    </a>
                </div>
                 | 
                <div class="badge">
                    <span class="badge-sub">
                        Author
                    </span>
                    <a href="https://cairbin.top" target="_blank">
                        <span class="badge-value" id="badge-author-value">
                            CairBin
                        </span>
                    </a>
                </div>
            </div>
        </el-footer>
    </el-container>
</template>

<style scoped>
.el-header{
    background-color:#1976D2;
    color:#ffffff;
    display: flex;
    align-items:center;
}

.el-footer{
    background-color: #edf1f2;
    color: #58666e;
    display: flex;
    align-items:center;
}

.footer-info{
    display: inline-block;
    border-radius: 4px;
    text-shadow: none;
    font-size: 12px;
    color: #fff;
    line-height: 15px;
    background-color: #abbac3;
    margin-bottom: 5px;
}

.badge{
    display: inline-block;
    background-color: #4d4d4d;
    padding:4px 4px 4px 0px;
    border-radius: 4px;
    color:white;
}

.badge .badge-sub{
    display: inline-block;
    background-color: #4d4d4d;
    padding: 4px 4px 4px 6px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    color: white;
}

.badge .badge-value{
    display: inline-block;
    padding: 4px 6px 4px 4px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    color: white;
}

#badge-github-value{
    background-color:#007ec6;
}

#badge-author-value{
    background-color: #ffa500;
}
</style>