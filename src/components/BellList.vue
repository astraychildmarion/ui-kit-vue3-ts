<template>
  <div class="xy-bell-list__wrapper" v-show="isShow">
    <template v-if="dataSource.length > 0">
      <div
        class="xy-bell-list__card"
        v-for="card in dataSource"
        :class="{ 'old-card': card.read }"
        :key="card.id"
      >
        <div class="xy-bell-list__card-title">
          {{ card.title }}
        </div>
        <div class="xy-bell-list__card-content">
          {{ card.content }}
        </div>
        <div class="xy-bell-list__card-footer">
          {{ convertToDate(card.timestamp) }}
        </div>
      </div>
    </template>
    <div v-if="isNoData" class="xy-bell-list__nodata">
      <Empty :image="emptyImage" />
    </div>
    <transition name="fade">
      <div class="xy-bell-list__loading" v-show="isShowLoading">
        <Skeleton active :loading="isShowLoading" />
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, onMounted, onUnmounted, watch } from 'vue';
import { Skeleton, Empty } from 'ant-design-vue';
/* eslint-disable import/no-extraneous-dependencies */
import debounce from 'lodash/debounce';
import { BellCardDataType } from './interface';

export default defineComponent({
  name: 'XYBellCard',
  components: { Skeleton, Empty },
  props: {
    dataSource: {
      type: Array as PropType<BellCardDataType[]>,
      default: () => [],
    },
    isShowLoading: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    isShow: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    isNoData: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['infiniteScroll'],
  setup(props, { emit }) {
    const infiniteScrollEvent = debounce(() => {
      const cardList = document.querySelector('.xy-bell-list__wrapper');
      if (props.isShowLoading) {
        if (
          cardList &&
          cardList.scrollHeight - cardList?.scrollTop - 150 <= cardList?.clientHeight
        ) {
          emit('infiniteScroll');
        }
      }
    }, 500);
    const convertToDate = (newDate: number) => {
      const thatDate = new Date(newDate);
      const newArray = thatDate.toISOString().split('T');
      let formated = newArray[0].replace(/-/i, '/');
      formated = formated.replace(/-/i, '/');
      return formated;
    };

    watch(
      () => props.isShow,
      (n) => {
        if (!n) {
          const cardList = document.querySelector('.xy-bell-list__wrapper');
          if (cardList) {
            cardList?.removeEventListener('scroll', infiniteScrollEvent);
            cardList.scrollTop = 0;
          }
        } else {
          const cardList = document.querySelector('.xy-bell-list__wrapper');
          if (cardList) cardList?.addEventListener('scroll', infiniteScrollEvent);
        }
      },
    );
    onMounted(() => {
      const cardList = document.querySelector('.xy-bell-list__wrapper');
      cardList?.addEventListener('scroll', infiniteScrollEvent);
    });
    onUnmounted(() => {
      const cardList = document.querySelector('.xy-bell-list__wrapper');
      cardList?.removeEventListener('scroll', infiniteScrollEvent);
    });
    const emptyImage: any = Empty.PRESENTED_IMAGE_SIMPLE;
    return {
      convertToDate,
      emptyImage,
    };
  },
});
</script>
<style lang="scss" scoped>
.xy-bell-list {
  &__wrapper {
    background-color: white;
    width: 288px;
    max-height: 400px;
    overflow-y: auto;
    box-shadow: 0 5px 9px 4px rgba(0, 0, 0, 0.05);
  }
  &__card {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px 24px 8px;
    &:last-child {
      border-bottom: none;
    }
    &-title {
      color: $bell-list-title-color;
      font-size: 16px;
      line-height: 1.5;
    }
    &-content {
      color: $bell-list-content-color;
      padding: 8px 0;
      line-height: 1.5;
    }
    &-footer {
      font-size: 10px;
      text-align: right;
      color: $bell-list-content-color;
      line-height: 1.5;
    }
    &.old-card {
      .xy-bell-list__card-title {
        color: $bell-list-content-old-color;
      }
      .xy-bell-list__card-content {
        color: $bell-list-content-old-color;
      }
      .xy-bell-list__card-footer {
        color: $bell-list-content-old-color;
      }
    }
  }
  &__hint {
    text-align: center;
    padding: 16px 0;
  }
  &__loading {
    padding: 16px 24px 8px;
  }
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  border-radius: 40px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: $scroll-thumb-color;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  background: $scroll-thumb-color-hover;
}

::-webkit-scrollbar-track:hover {
  background: $scroll-track-color-hover;
}
</style>
