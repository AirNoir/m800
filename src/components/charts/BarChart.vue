<template>
  <div class="canvas-wrapper">
      <canvas ref="bar"></canvas>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'bar-chart',
  data: () => ({
    canvas: null,
    ctx: null,
    margin: 40,
    unit: 20,
  }),
  computed: {
    ...mapState({
      weatherData: (state) => state.weatherData,
    }),
    currentMax() {
      if (!this.weatherData) {
        return null;
      }
      return Math.max(...this.weatherData.consolidated_weather.slice(0, 5).map((item) => item.max_temp));
    },
    currentMin() {
      if (!this.weatherData) {
        return null;
      }
      return Math.min(...this.weatherData.consolidated_weather.slice(0, 5).map((item) => item.min_temp));
    },
  },
  watch: {
    currentMax: {
      handler() {
        requestAnimationFrame(this.drawBar);
        this.drawBar();
      },
    },

  },
  mounted() {
    this.canvas = this.$refs.bar;
    this.ctx = this.canvas.getContext('2d');
    if (this.ctx) {
      this.drawPanel();
    }
  },
  methods: {
    clearCanvas() {
      const { ctx, canvas } = this;
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    },
    drawMinMax() {
      const {
        canvas, ctx, currentMax, currentMin, unit, margin,
      } = this;
      const yAxisHeight = canvas.height - margin;
      /* draw max temperature */
      const calcaulateBase = ((60 - currentMax) / 5) * unit;
      const maxTempHeight = yAxisHeight - calcaulateBase;
      const [maxStart, minStart] = [200, 400];
      ctx.moveTo(maxStart, yAxisHeight);
      ctx.fillStyle = '#FFA500';
      ctx.globalAlpha = 0.5;
      ctx.fillRect(maxStart, calcaulateBase, 100, maxTempHeight);
      ctx.fillStyle = '#000';
      ctx.globalAlpha = 1;
      ctx.font = '12px Arial';
      ctx.fillText(`Max (${currentMax.toFixed(1)}℃) @ ${this.weatherData.title}`, maxStart, calcaulateBase - 10);
      /* draw min temperature */
      const calcaulateMinBase = ((60 - currentMin) / 5) * unit;
      const minTempHeight = yAxisHeight - calcaulateMinBase;
      ctx.moveTo(minStart, yAxisHeight);
      ctx.fillStyle = 'lightblue';
      ctx.globalAlpha = 0.5;
      ctx.fillRect(minStart, calcaulateMinBase, 100, minTempHeight);
      ctx.fillStyle = '#000';
      ctx.globalAlpha = 1;
      ctx.font = '12px Arial';
      ctx.fillText(`Min (${currentMin.toFixed(1)}℃) @ ${this.weatherData.title}`, minStart, calcaulateMinBase - 10);
    },
    drawBar() {
      this.clearCanvas();
      this.drawPanel();
      this.drawMinMax();
    },
    drawPanel() {
      const { canvas, ctx, margin } = this;
      canvas.width = 800;
      canvas.height = 440;
      this.unit = (canvas.height - margin) / 16;

      /* xy axis */
      ctx.moveTo(this.unit + margin, 0);
      ctx.lineTo(this.unit + margin, canvas.height - margin);
      ctx.moveTo(this.unit + margin, canvas.height - margin);
      ctx.lineTo(canvas.width - margin, canvas.height - margin);
      ctx.stroke();

      for (let i = 0; i < 16; i += 1) {
        const pos = i * this.unit;
        ctx.moveTo(this.unit + margin, pos);
        ctx.lineWidth = 0.1;
        ctx.lineTo(canvas.width - margin, pos);
        ctx.fillText(`${(i - 4) * 5}℃`, 10, canvas.height - pos - margin);
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
