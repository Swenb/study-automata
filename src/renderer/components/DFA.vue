<template>
  <div>

    <el-steps :active="active" finish-status="success" style="margin-bottom:30px" simple>
      <el-step title="状态集Q"></el-step>
      <el-step title="字母表∑"></el-step>
      <el-step title="转移函数δ"></el-step>
    </el-steps>

    <el-form :model="DFA" ref="DFA" label-width="80px">

      <el-col :span="24" v-show="active === 0">
        <el-form-item
          v-for="(q, index) in DFA.Q"
          :label="index === 0 ? '初始状态': '状态' + index"
          :key="'q.' + q.value"
          :prop="q.value"
        >
          <el-col :span="10">
            <el-input v-model="q.value" placeholder="状态名称"></el-input>
          </el-col>
          <el-button @click.prevent="q.final = !q.final" style="margin-left:5px" v-bind:type="q.final?'success':'primary'" plain>{{q.final ? '取消' : '设为'}}终结状态</el-button>
          <el-button @click.prevent="remove(DFA.Q, q)" style="margin-left:3px" v-if="index" type="danger" plain>删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addq">新增状态</el-button>
        </el-form-item>


        <el-alert v-if="err_msg" :title=err_msg type="error"></el-alert>
        <el-button style="margin-top: 12px;" @click="before">上一步</el-button>
        <el-button style="margin-top: 12px;" @click="next(DFA.Q)">下一步</el-button>
        <el-button @click="reset('DFA')">全部重置</el-button>
      </el-col>

      <el-col :span="24" v-show="active === 1">
        <el-form-item
          v-for="(s, index) in DFA.S"
          :label="'字母' + index"
          :key="'s.' + s.value"
          :prop="s.value"
        >
          <el-col :span="10">
            <el-input v-model="s.value" placeholder="字母"></el-input>
          </el-col>
          <el-button @click.prevent="remove(DFA.S, s)" style="margin-left:3px" type="danger" plain>删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="adds">新增字母</el-button>
        </el-form-item>

        <el-alert v-if="err_msg" :title=err_msg type="error"></el-alert>
        <el-button style="margin-top: 12px;" @click="before">上一步</el-button>
        <el-button style="margin-top: 12px;" @click="next(DFA.S)">下一步</el-button>
        <el-button @click="reset('DFA')">全部重置</el-button>
      </el-col>

      <el-col :span="24" v-show="active === 2">

        <el-form-item
          v-for="(d, index) in DFA.D"
          :label="`(${d.value})`"
          :key="'d.' + d.value"
          :prop="d.result"
        >
          <el-col :span="10">
            <el-select v-model="d.result" placeholder="转移状态">
              <el-option v-for="(q, index) in DFA.Q" :key="'d.q.' + q.value" :label="q.value" :value="q.value"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-alert v-if="err_msg" :title=err_msg type="error"></el-alert>
        <el-button style="margin-top: 12px;" @click="before">上一步</el-button>
        <el-button style="margin-top: 12px;" @click="create">创建DFA</el-button>
        <el-button @click="reset('DFA')">全部重置</el-button>
      </el-col>
    </el-form>



    <p>状态集Q: </p>
    <p v-for="Q in DFA.Q">{{ Q.value }} 是否接受：{{ Q.final }}</p>
    <p>字母表∑:</p>
    <p v-for="S in DFA.S"> {{ S.value }}</p>
    <p>转移函数δ: </p>
    <p v-for="D in DFA.D">{{ D.value }} => {{ D.result }}</p>
    <p>初始状态q0: {{ DFA.q0.value }}</p>
    <span>待匹配串w</span>
    <input type="text" v-model="inputText" />
    <button @click="accept()">submit</button>
    <p>终止状态：{{ final ? final.value : '' }}</p>
    <p>是否接受：{{ final ? final.final : '' }}</p>

  </div>
</template>

<style scoped>
.form {
  margin-top: 15px;
}
</style>

<script>
/* eslint-disable no-eval */
export default {
  data() {
    return {
      DFA: {
        Q: [
          { value: 'q0', final: false },
          { value: 'q1', final: false },
          { value: 'q2', final: true },
        ],
        S: [
          { value: '0' },
          { value: '1' },
        ],
        D: [
          { value: 'q0 0', result: 'q1' },
          { value: 'q0 1', result: 'q0' },
          { value: 'q1 0', result: 'q2' },
          { value: 'q1 1', result: 'q0' },
          { value: 'q2 0', result: 'q2' },
          { value: 'q2 1', result: 'q0' },
        ],
        q0: { value: 'q0' },
      },

      inputText: null,
      final: null,
      active: 0,
      err_msg: '',
    };
  },
  methods: {
    hasValue(arr, val) {
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].value === val) {
          return i;
        }
      }
      return false;
    },
    getObjFromValue(arr, val) {
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].value === val) {
          return arr[i];
        }
      }
      return undefined;
    },
    hasEmptyValue(arr) {
      for (let i = 0; i < arr.length; i += 1) {
        if (!arr[i].value) {
          return true;
        }
      }
      return false;
    },
    hasMulValue(arr) {
      for (let i = 0; i < arr.length; i += 1) {
        for (let j = i + 1; j < arr.length; j += 1) {
          if (arr[i].value === arr[j].value) return true;
        }
      }
      return false;
    },
    transd(q, a) {
      if (this.hasValue(this.DFA.Q, q.value) !== false && this.hasValue(this.DFA.S, a) !== false) {
        console.log(this.getObjFromValue(this.DFA.D, `${q.value} ${a}`));
        return this.getObjFromValue(this.DFA.D, `${q.value} ${a}`).result;
      }
      return undefined;
    },
    xtransd(q, w) {
      for (let i = 0; i < w.length; i += 1) {
        q = this.getObjFromValue(this.DFA.Q, this.transd(q, w[i]));
        console.log(q);
      }
      return q;
    },
    accept() {
      this.final = this.xtransd(this.DFA.q0, this.inputText);
      return this.final.final;
    },
    next(arr) {
      console.log(this.active);
      if (this.hasEmptyValue(arr)) {
        this.err_msg = '不能有空值';
        return false;
      }
      if (this.hasMulValue(arr)) {
        this.err_msg = '不能有重复值';
        return false;
      }
      this.err_msg = '';
      this.active += 1;
      if (this.active > 2) this.active = 2;
      return true;
    },
    before() {
      this.active -= 1;
      if (this.active < 0) this.active = 0;
    },
    create() {
      if (this.hasEmptyValue(this.DFA.D)) {
        this.err_msg = '不能有空值';
      }
    },
    remove(arr, item) {
      const index = arr.indexOf(item);
      if (index !== -1) {
        arr.splice(index, 1);
      }
    },
    addq() {
      this.DFA.Q.push({ value: '', final: false });
    },
    adds() {
      this.DFA.S.push({ value: '' });
    },
    reset() {
      this.DFA = {
        Q: [
          { value: 'q0', final: false },
        ],
        S: [],
        D: [],
        q0: { value: 'q0' },
      };
      this.active = 0;
    },
  },
  watch: {
    active(val) {
      if (val === 2) {
        this.DFA.D = [];
        for (let i = 0; i < this.DFA.Q.length; i += 1) {
          for (let j = 0; j < this.DFA.S.length; j += 1) {
            this.DFA.D.push({ value: `${this.DFA.Q[i].value} ${this.DFA.S[j].value}`, result: '' });
          }
        }
      }
    },
  },
};
</script>
