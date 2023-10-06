import {ref,onUnmounted} from 'vue'
export const useToast = () => {
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastAlertType = ref('');
    const timeout = ref(null);
    const triggerToast = (message, type= 'success') => {
        toastMessage.value = message;
        toastAlertType.value = type;
        showToast.value = true;
        timeout.value = setTimeout(() => {
            console.log('hello');
            toastMessage.value = '';
            toastAlertType.value = '';
            showToast.value = false;
        }, 3000);
    }
    //다른 페이지 이동시 setTimeout멈추게해서 hello안뜨게 하고 싶을 떄 
    onUnmounted(() => {
        clearTimeout(timeout.value);
    });
    return {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast
    }
}
