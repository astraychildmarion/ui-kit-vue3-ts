<template>
  <div class="xy-bell-list__wrapper" v-if="isShow">
    <div
      class="xy-bell-list__card"
      v-for="card in listData"
      :key="card.id"
      :class="{ 'old-card': card.read }"
    >
      <div class="xy-bell-list__card-title">
        {{ card.title }}
      </div>
      <div class="xy-bell-list__card-content">
        {{ card.content }}
      </div>
      <div class="xy-bell-list__card-footer">
        {{ card.date }}
      </div>
    </div>
    <transition name="fade">
      <div class="xy-bell-list__hint xy-bell-list__loading" v-if="loading && !dataEnd">
        <LoadingOutlined :style="{ fontSize: '24px' }" />
      </div>
    </transition>
    <div class="xy-bell-list__hint xy-bell-list__noData" v-if="dataEnd">No data</div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
} from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { BellCardDataType } from './interface';

export default defineComponent({
  name: 'XYBellCard',
  components: { LoadingOutlined },
  props: {
    dataSource: {
      type: Array as PropType<BellCardDataType[]>,
      default: () => [],
    },
    page: {
      type: String,
      default: '1',
    },
    totalPage: {
      type: String,
      default: '1',
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['loadMore'],
  setup(props, { emit }) {
    const listData = reactive(props.dataSource);
    const dataEnd = computed(() => props.page === props.totalPage);
    const loading = ref<boolean>(false);

    watch(
      () => props.isShow,
      (n) => {
        console.log('is show ineer', n);
      },
    );

    const loadMoreEvent = () => {
      const cardList = document.querySelector('.xy-bell-list__wrapper');
      if (cardList && cardList?.scrollTop + cardList?.clientHeight >= cardList.scrollHeight) {
        emit('loadMore');
      }
    };
    onMounted(() => {
      console.log('nMount!');
      const cardList = document.querySelector('.xy-bell-list__wrapper');
      cardList?.addEventListener('scroll', loadMoreEvent);
    });
    onUnmounted(() => {
      console.log('unmounted!');
      const cardList = document.querySelector('.xy-bell-list__wrapper');
      cardList?.removeEventListener('scroll', loadMoreEvent);
    });
    return {
      listData,
      dataEnd,
      loading,
    };
  },
});
</script>
<style lang="scss" scoped>
.xy-bell-list {
  &__wrapper {
    box-shadow: 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    width: 288px;
    max-height: 400px;
    overflow-y: auto;
  }
  &__card {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px 24px 8px;
    &:last-child {
      border-bottom: none;
    }
    &-title {
      color: #102e4d;
      font-size: 16px;
    }
    &-content {
      color: #5c666f;
      padding: 8px 0;
    }
    &-footer {
      font-size: 10px;
      text-align: right;
      color: #5c666f;
    }
    &.old-card {
      .xy-bell-list__card-title {
        color: #dadcde;
      }
      .xy-bell-list__card-content {
        color: #dadcde;
      }
      .xy-bell-list__card-footer {
        color: #dadcde;
      }
    }
  }
  &__hint {
    text-align: center;
    padding: 16px 0;
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
  background: #d8d8d8;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(124, 122, 122);
}

::-webkit-scrollbar-track:hover {
  background: #f4f1f1;
}
</style>
