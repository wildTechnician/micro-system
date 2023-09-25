<template>
  <blockElement title="环境气象监测">
    <div class="weather-container">
      <div class="weather-container-left">
        <iconBlockElement title="实况监测-气象" icon="shengtaishikuang">
          <div class="weather-container-itemFlex">
            <div v-for="item in 8" :key="`dewferw${item}`" class="weather-container-itemFlex_item">
              <p>10</p>
              <p>温度</p>
            </div>
          </div>
        </iconBlockElement>
        <iconBlockElement title="实况监测-大气" icon="shengtaishikuang">
          <div class="weather-container-itemFlex">
            <div v-for="item in 8" :key="`dewffffew${item}`" class="weather-container-itemFlex_item">
              <p>10000000000</p>
              <p>湿度</p>
            </div>
          </div>
        </iconBlockElement>
      </div>

      <span class="space-divider"></span>

      <div ref="weatherCenter" class="weather-container-center">
        <div class="weather-container-center_soil">
          <div class="outCircle" style="width: 90%; padding-top: 90%">
            <div class="insideCircle">
              <span>土壤检测</span>
            </div>
          </div>
        </div>

        <div class="weather-container-center_brackets">
          <svg xmlns="http://www.w3.org/2000/svg" height="100%">
            <path :d="`M20 ${centerHeight / 2} l5 -5 v-${Math.abs(centerHeight / 2 - 20)} l5 -5`" stroke="#ffffff" fill-opacity="0"></path>
            <path :d="`M20 ${centerHeight / 2} l5 5 v${Math.abs(centerHeight / 2 - 20)} l5 5`" stroke="#ffffff" fill-opacity="0"></path>
          </svg>
        </div>
        <div class="weather-container-center_soilItems">
          <div v-for="items in 5" :key="`fewhf${items}`" class="weather-container-center_soilItems-Data">
            <p>土壤含氮</p>
            <p>68</p>
          </div>
        </div>
      </div>

      <span class="space-divider"></span>

      <div class="weather-container-right">
        <iconBlockElement title="水文监测" icon="shuiwenjiance">
          <div class="weather-container-right_water">
            <div class="weather-container-right_water_item">
              <div class="outCircle weather-container-right_water_itemOutCircle">
                <div class="insideCircle weather-container-right_water_insideCircle">
                  <span>总流量</span>
                </div>
              </div>
              <!-- <svg xmlns="http://www.w3.org/2000/svg" height="100%">
                <path :d="`M50 ${Math.abs(centerHeight / 6)} l5 -10 h50%}`" stroke="#ffffff" fill-opacity="0"></path>
              </svg> -->
              <div class="weather-container-right_water_item_data">
                <p><span>68</span> 毫米</p>
                <p>同比 <span>12%</span></p>
                <p>环比 <span>79%</span></p>
              </div>
            </div>

            <div class="weather-container-right_water_item">
              <div class="outCircle weather-container-right_water_itemOutCircle">
                <div class="insideCircle weather-container-right_water_insideCircle">
                  <span>总流量</span>
                </div>
              </div>
              <!-- <svg xmlns="http://www.w3.org/2000/svg" height="100%">
                <path :d="`M50 ${Math.abs(centerHeight / 6)} l5 -10 h50%}`" stroke="#ffffff" fill-opacity="0"></path>
              </svg> -->
              <div class="weather-container-right_water_item_data">
                <p><span>68</span> 毫米</p>
                <p>同比 <span>12%</span></p>
                <p>环比 <span>79%</span></p>
              </div>
            </div>

            <div class="weather-container-right_water_item">
              <div class="outCircle weather-container-right_water_itemOutCircle">
                <div class="insideCircle weather-container-right_water_insideCircle">
                  <span>总流量</span>
                </div>
              </div>
              <!-- <svg xmlns="http://www.w3.org/2000/svg" height="100%">
                <path :d="`M50 ${Math.abs(centerHeight / 6)} l5 -10 h50%}`" stroke="#ffffff" fill-opacity="0"></path>
              </svg> -->
              <div class="weather-container-right_water_item_data">
                <p><span>68</span> 毫米</p>
                <p>同比 <span>12%</span></p>
                <p>环比 <span>79%</span></p>
              </div>
            </div>

            <div class="weather-container-right_water_item">
              <div class="outCircle weather-container-right_water_itemOutCircle">
                <div class="insideCircle weather-container-right_water_insideCircle">
                  <span>总流量</span>
                </div>
              </div>
              <!-- <svg xmlns="http://www.w3.org/2000/svg" height="100%">
                <path :d="`M50 ${Math.abs(centerHeight / 6)} l5 -10 h50%}`" stroke="#ffffff" fill-opacity="0"></path>
              </svg> -->
              <div class="weather-container-right_water_item_data">
                <p><span>68</span> 毫米</p>
                <p>同比 <span>12%</span></p>
                <p>环比 <span>79%</span></p>
              </div>
            </div>
          </div>
        </iconBlockElement>
      </div>
    </div>
  </blockElement>
</template>

<script setup lang="ts" name="ecologyMonitor">
import { blockElement, iconBlockElement } from '@/components/index';

const weatherCenter = shallowRef<HTMLElement>();
const centerHeight = shallowRef<number>(0);

onMounted(() => {
  centerHeight.value = weatherCenter.value?.clientHeight as number;
});
</script>

<style lang="scss" scoped>
.weather-container {
  height: tovh(280);
  min-height: 280px;
  display: flex;
  & > div {
    width: 33.3%;
  }

  &-itemFlex {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: repeat(2, 50%);

    &_item {
      border-bottom: solid 1px #fff;
      margin: 0 5px;
      text-align: center;
      font-size: 12px;
      & > p {
        padding: 5px 0;
        @include textEllipsis;
      }
      p:first-child {
        color: var(--el-color-primary);
        font-size: 16px;
      }
    }
  }

  .outCircle {
    border: solid 1px var(--el-color-primary);
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .insideCircle {
    width: 70%;
    height: 70%;
    border: dashed 1px var(--el-color-primary);
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > span {
      @include textEllipsis();
    }
  }

  &-left {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    align-content: space-between;
    & > div {
      width: 100%;
    }
  }
  &-right {
    &_water {
      height: 280px;
      display: grid;
      grid-template-columns: repeat(2, 45%);
      grid-template-rows: repeat(2, 50%);
      gap: 5%;
      padding: 5% 0 0 5%;
      &_item {
        position: relative;
        &_data {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 55%;
          font-size: 8px;
          & > p {
            margin: 5px 0;
            @include textEllipsis();
          }
          span {
            font-size: 16px;
            font-weight: bold;
            color: var(--el-color-primary);
          }
        }
      }
      &_itemOutCircle {
        width: 40% !important;
        padding-top: 40%;
        left: 20% !important;
        border: solid 1px #fff !important;
      }
      &_insideCircle {
        border: solid 1px #fff !important;
        font-size: 12px !important;
      }
    }
  }
  &-center {
    display: flex;
    &_soil {
      width: 40%;
      position: relative;
    }
    &_brackets {
      width: 10%;
    }
    &_soilItems {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      &-Data {
        text-align: center;
        width: 100%;
        & > p {
          padding: 5px 0;
        }
        & > p:first-child {
          font-size: 12px;
          &::before {
            content: '';
            display: inline-block;
            height: 5px;
            width: 5px;
            background-color: var(--el-color-white);
            vertical-align: middle;
            margin-right: 5px;
          }
        }
        & > p:last-child {
          color: var(--el-color-primary);
        }
      }
    }
  }
}
.space-divider {
  display: inline-block;
  height: tovh(280);
  min-height: 280px;
  width: 1px;
  border-left: var(--el-border-style) 1px var(--el-color-primary);
}
</style>
