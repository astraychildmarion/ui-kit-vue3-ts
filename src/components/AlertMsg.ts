// reference: https://juejin.cn/post/6986568226817703967
import { createVNode, render } from 'vue';
import alertTemplate from './AlertMsg.vue';
import { AlertPropType } from './interface';

export interface ResultParams {
  destory?: () => void;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const XYAlertMsgApi = (options: AlertPropType): ResultParams => {
  // create a div to fix alerts
  if (!document.querySelector('.xy-alert-wrapper')) {
    const container = document.createElement('div');
    container.className = `xy-alert-wrapper`;
    document.body.appendChild(container);
  }

  const alertContainer = document.querySelector('.xy-alert-wrapper');
  const vmUniqueName = Date.now().toString();
  const opt = { ...options };
  // create alert vertual and insert
  if (alertContainer) {
    const wrapper = document.createElement('div');
    wrapper.className = `alert-${vmUniqueName}`;
    const vm = createVNode(alertTemplate, opt);
    render(vm, wrapper);
    alertContainer.appendChild(wrapper);
  }
  const destory = () => {
    if (alertContainer) {
      const arrayAlert = alertContainer.querySelectorAll('.xy-alert');
      const thisAlert = alertContainer.querySelector(`.alert-${vmUniqueName}`);
      if (arrayAlert.length > 1 && thisAlert) {
        thisAlert?.classList.add('remove');
        const t = setTimeout(() => {
          render(null, alertContainer);
          alertContainer.removeChild(thisAlert);
          clearTimeout(t);
        }, 300);
      } else if (arrayAlert.length === 1 && thisAlert) {
        // destroy container when last alert is destroyed
        thisAlert?.classList.add('remove');
        const t = setTimeout(() => {
          render(null, alertContainer);
          alertContainer.removeChild(thisAlert);
          clearTimeout(t);
        }, 300);
        document.body.removeChild(alertContainer);
      }
    }
  };
  // green: auto close after 3 sec or customize seconds
  // red: manual close
  if (opt.seconds) {
    const timer = setTimeout(() => {
      destory();
      clearTimeout(timer);
    }, opt.seconds * 1000);
  } else if (opt.alertType !== 'error') {
    const timer = setTimeout(() => {
      destory();
      clearTimeout(timer);
    }, 3000);
  }
  if (opt.alertType === 'error') {
    const thisAlert = document.querySelector(`.alert-${vmUniqueName}`);
    const closeButton = thisAlert?.querySelector('.ant-alert-close-icon');
    closeButton?.addEventListener('click', destory);
  }
  return {
    destory,
  };
};
export default XYAlertMsgApi;
