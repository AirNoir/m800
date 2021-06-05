<template>
  <div class="canvas-wrapper">
      <canvas ref="pie"></canvas>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'pie-chart',
  data: () => ({
    canvas: null,
    ctx: null,
    colors: ['#ff9900', '#c4dff6', '#1793d1', '#9f9fa3', '#003366'],

  }),
  computed: {
    ...mapState({
      weatherData: (state) => state.weatherData,
    }),
    humidityList() {
      if (!this.weatherData) {
        return [];
      }
      return this.weatherData.consolidated_weather.slice(0, 5).map((item) => ({ humidity: item.humidity, date: item.applicable_date }));
    },
  },
  watch: {
    humidityList: {
      deep: true,
      handler() {
        requestAnimationFrame(this.drawPie);
        this.drawPie();
      },
    },

  },
  mounted() {
    this.canvas = this.$refs.pie;
    this.ctx = this.canvas.getContext('2d');
    this.drawPie();
  },

  methods: {
    clearCanvas() {
      const { ctx, canvas } = this;
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    },
    drawPie() {
      const {
        canvas, ctx, colors, humidityList,
      } = this;
      const total = humidityList.map((item) => item.humidity).reduce((prev, curr) => prev + curr, 0); // Automatically calculated so don't touch
      let end = 0;

      canvas.width = 800;
      canvas.height = 400;
      const centerX = canvas.width / 3;
      const centerY = canvas.height / 3;
      humidityList.forEach((item, index) => {
        ctx.fillStyle = colors[index];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, centerY, end, end + (Math.PI * 2 * (item.humidity / total)), false);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
        end += Math.PI * 2 * (item.humidity / total);
      });
      this.drawData();
    },
    drawData() {
      const {
        canvas, ctx, colors, humidityList,
      } = this;
      const startPoint = (canvas.width * 2) / 3;
      humidityList.forEach((item, index) => {
        ctx.moveTo(startPoint, 0);
        ctx.fillStyle = colors[index];
        ctx.fillRect(startPoint, index * 30, 25, 25);
        ctx.font = '16px Arial';
        ctx.fillText(`${item.humidity}% @ ${item.date}`, startPoint + 40, (index + 1) * 30 - 12);
      });
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
