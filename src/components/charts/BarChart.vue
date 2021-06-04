<template>
  <div class="canvas-wrapper">
      <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'bar-chart',
  data: () => ({
    canvas: null,
    ctx: null,
  }),
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext('2d');
    if (this.ctx) {
      this.draw();
    }
  },
  methods: {
    draw() {
      const { canvas, ctx } = this;
      canvas.width = 800;
      canvas.height = 400;
      const margin = 40;
      // draw x, y axis
      ctx.moveTo(margin, 0);
      ctx.lineTo(margin, canvas.height - margin);
      ctx.moveTo(margin, canvas.height - margin);
      ctx.lineTo(800, canvas.height - margin);
      ctx.stroke();

      for (let i = 1; i < 10; i += 1) {
        const pos = i * 40;
        ctx.moveTo(margin, pos);
        ctx.lineTo(800, pos);
        ctx.fillText(pos, 10, canvas.height - pos);
      }
      ctx.stroke();
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas-wrapper {
  display: block;
  width: 100%;
  padding-top: 50px;

}

</style>
