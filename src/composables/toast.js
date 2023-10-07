import {computed,onUnmounted} from 'vue'
import {useStore} from 'vuex'
export const useToast = () => {
    const store = useStore();
    const showToast =  computed(()=>store.state.showToast)
    const toastMessage =  computed(()=>store.state.toastMessage)
    const toastAlertType = computed(()=>store.state.toastAlertType)
    const timeout =  computed(()=>store.state.timeout)
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
