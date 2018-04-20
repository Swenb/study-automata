<template>
  <div>
    <input type="text" v-model="inputText" />
    <button v-on:click="accept()">submit</button>
    <p>终止状态：{{ final }}</p>
    <p>是否接受：{{ accepted }}</p>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  data() {
    return {
      DFA: {
        Q: [0, 1, 2],
        S: [0, 1],
        D: new Map([
          ['0 0', 1],
          ['0 1', 0],
          ['1 0', 2],
          ['1 1', 0],
          ['2 0', 2],
          ['2 1', 0],
        ]),
        q0: 0,
        F: [2],
      },
      inputText: null,
      accepted: null,
      final: null,
    };
  },
  methods: {
    has(arr, val) {
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i] === val) {
          return true;
        }
      }
      return false;
    },
    transd(q, a) {
      if (this.has(this.DFA.Q, q) && this.has(this.DFA.S, a)) {
        // console.log(this.DFA.D.get(`${q} ${a}`));
        return this.DFA.D.get(`${q} ${a}`);
      }
      return undefined;
    },
    xtransd(q, w) {
      for (let i = 0; i < w.length; i += 1) {
        q = this.transd(q, parseInt(w[i], 10));
        // console.log(q);
      }
      this.final = q;
      return q;
    },
    accept() {
      const ans = this.has(this.DFA.F, this.xtransd(this.DFA.q0, this.inputText)) || false;
      this.accepted = ans;
    },
  },
};
</script>