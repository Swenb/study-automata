<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1', '2', '3', '4']" :default-active="'0'">

          <router-link to="/"><el-menu-item index="0"><i class="el-icon-star-off"></i>WELCOME!</el-menu-item></router-link>

          <el-submenu index="1">
            <template slot="title"><i class="el-icon-setting"></i>自动机演示</template>
              <router-link to="/dfa"><el-menu-item index="1-1">DFA</el-menu-item></router-link>
              <el-menu-item index="1-2">NFA</el-menu-item>
              <el-menu-item index="1-2">PDA</el-menu-item>          
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>语法演示</template>
              <el-menu-item index="2-1">Regex</el-menu-item>
              <el-menu-item index="2-2">CFG</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-refresh"></i>自动机-自动机转换</template>
              <el-menu-item index="3-1">NFA => DFA</el-menu-item>
              <el-menu-item index="3-2">PDA => DPDA</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title"><i class="el-icon-sort"></i>自动机-语法转换</template>
              <el-menu-item index="4-1">NFA/DFA <=> Regex</el-menu-item>
              <el-menu-item index="4-2">PDA <=> CFG</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>

    </el-container>
  </div>
</template>

<script>
import LandingPage from './components/LandingPage';
import DFA from './components/DFA';

export default {
  name: 'study-automata',
  components: {
    LandingPage,
    DFA,
  },
};
</script>

<style>
/* CSS */
@font-face
{
font-family: SourceSansPro-Regular;
src: url('./assets/fonts/SourceSansPro-Regular.otf');
}
@font-face {
font-family: SourceSansPro-Light;
src: url('./assets/fonts/SourceSansPro-Light.otf');
}
body {
  margin: 0;
  border-style: none;
}
a {
  text-decoration: none;
}
.el-aside {
  color: #333;
}
</style>
