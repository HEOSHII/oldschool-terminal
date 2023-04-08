<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const britishType = ref(true);

const compose = (...fns) => arg => fns.reduce((composed, fn) => fn(composed), arg);
const oneSecond = () => 1000;
const getDate = british => ({ date: new Date(), british });
const serializeTime = ({ date, british }) => ({
  hours: date.getHours(),
  minutes: date.getMinutes(),
  british
});
const appendPeriod = serializedTime => ({
  ...serializedTime,
  period: serializedTime.hours > 12 ? 'PM' : 'AM'
});
const typifyHours = serializedTime => ({
  ...serializedTime,
  hours: serializedTime.hours > 12 && serializedTime.british ? serializedTime.hours - 12 : serializedTime.hours
});
const prependZero = key => time => ({
  ...time,
  [key]: time[key] < 10 ? '0' + time[key] : time[key]
});
const doubleDigits = serializedTime => compose(prependZero('hours'), prependZero('minutes'))(serializedTime);
const getCurrentTime = british => compose(getDate, serializeTime, appendPeriod, typifyHours, doubleDigits)(british);

const time = reactive({ current: getCurrentTime(britishType.value) });

const onChangeTimeType = () => {
  britishType.value = !britishType.value;
  time.current = getCurrentTime(britishType.value);
};


onMounted(() => { const timeUpdater = setInterval(() => time.current = getCurrentTime(britishType.value), oneSecond()) });
onUnmounted(() => clearInterval(timeUpdater));

</script>

<template>
  <div class="text-2xl px-1 cursor-pointer hover:bg-terminal-main-primary hover:text-terminal-main-dark"
    @click="onChangeTimeType">
    <span>{{ time.current.hours }}</span>
    <span class="animate-pulse">:</span>
    <span>{{ time.current.minutes }} </span>
    <span v-if="time.current.british">{{ time.current.period }}</span>
  </div>
</template>