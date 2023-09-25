<template>
  <block-element title="巡防巡护">
    <div class="patrolTeamContainer">
      <div class="patrolTeamContainer-card">
        <el-carousel :interval="4000" type="card" height="100%" indicator-position="none">
          <el-carousel-item v-for="item in 5" :key="item">
            <div class="patrolTeamContainer-card_item">
              <p>大雪山林场</p>
              <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="10%">
                <path :d="`M0 62 l5 -5 v-20 l5 -5`" stroke="#ffffff" fill-opacity="0"></path>
                <path :d="`M0 62 l5 5 v20 l5 5`" stroke="#ffffff" fill-opacity="0"></path>
              </svg>
              <div>
                <p style="color: #f6a23b">总人数 35人</p>
                <p style="color: #01ff76">在线 35人</p>
                <p style="color: #01daca">离线 35人</p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="patrolTeamContainer-territory">
        <div class="patrolTeamContainer-territory-outCircle">
          <div class="patrolTeamContainer-territory-insideCircle"></div>
        </div>
      </div>
      <div class="patrolTeamContainer-legend">
        <div class="legend">
          <i style="background-color: #f6a23b"></i>
          <span>总人数</span>
        </div>
        <div class="legend">
          <i style="background-color: #01ff76"></i>
          <span>在线</span>
        </div>
        <div class="legend">
          <i style="background-color: #01daca"></i>
          <span>离线</span>
        </div>
      </div>
    </div>
  </block-element>
</template>

<script setup lang="ts" name="patrolTeam">
import { blockElement } from '@/components';
</script>
1
<style lang="scss" scoped>
.patrolTeamContainer {
  height: tovh(250);
  min-height: 250px;
  position: relative;

  &-card {
    height: 60%;
    width: 100%;
    position: absolute;
    top: 5%;
    &_item {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      & > p {
        width: 15%;
        font-size: 12px;
      }
      & > div:last-child {
        font-size: 12px;
        @include textEllipsis();
        & > p {
          line-height: 30px;
        }
      }
    }

    .el-carousel {
      height: 100%;
      overflow: visible;
    }

    .el-carousel__item > div {
      min-width: 110px;
      width: tovw(110);
      margin: 0;
      background: radial-gradient(transparent, 40%, var(--el-color-primary));
      text-align: center;
    }
    .el-carousel__item {
      display: flex;
      justify-content: center;
      :deep(.el-carousel__mask) {
        opacity: 0;
      }
    }
  }
  &-territory {
    width: 100%;
    position: absolute;
    bottom: 10%;
    &-outCircle {
      height: tovh(80);
      width: 100%;
      border-radius: 100%;
      background: radial-gradient(transparent, 70%, var(--el-color-primary));
    }
    &-insideCircle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 100%;
      background: radial-gradient(transparent, 60%, var(--el-color-primary));
      animation: radial 3s infinite;
    }
  }
  &-legend {
    width: 100%;
    display: flex;
    position: absolute;
    justify-content: center;
    bottom: 0%;
  }
  .legend {
    height: 100%;
    display: flex;
    font-size: 12px;
    align-items: center;
    margin: 0 5px;
    // @include textEllipsis();
    i {
      height: 10px;
      width: 10px;
      margin: 0 3px;
      border-radius: 100%;
    }
  }
}

@keyframes radial {
  10% {
    opacity: 1;
    width: 0;
    height: 0;
  }
  90% {
    opacity: 0;
    height: 50%;
    width: 50%;
  }
  100% {
    opacity: 0;
    width: 0;
    height: 0;
  }
}
</style>
