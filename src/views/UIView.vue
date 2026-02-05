<script>
import MyBadge from '@/components/ui/MyBadge.vue'
import MyButton from '@/components/ui/MyButton.vue'
import MyCheckbox from '@/components/ui/MyCheckbox.vue'
import MyDatePicker from '@/components/ui/MyDatePicker.vue'
import MyInput from '@/components/ui/MyInput.vue'
import MySelect from '@/components/ui/MySelect.vue'
import MySymbolsCounter from '@/components/ui/MySymbolsCounter.vue'
import MyTabs from '@/components/ui/MyTabs.vue'
import MyTextarea from '@/components/ui/MyTextarea.vue'
import MyTimePicker from '@/components/ui/MyTimePicker.vue'
import MyToggle from '@/components/ui/MyToggle.vue'

export default {
  name: 'ui',
  data() {
    return {
      isEnabled: false,
      isCompleted: true,
      isError: true,
      isDisabled: true,

      inputText: '',
      textareaText: '',

      category: '',
      categoryOptions: [
        { value: 'work', label: 'Work' },
        { value: 'personal', label: 'Personal' },
        { value: 'study', label: 'Study' },
      ],

      priority: 'low',
      priorityOptions: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
      ],

      taskDate: '',
      taskTime: '',
      meetingDate: '2025-02-10',
      meetingTime: '14:30',
    }
  },
}
</script>

<template>
  <main class="ui__main">
    <!-- Badge -->
    <div class="ui_container">
      <h1 class="ui__title">Badge</h1>
      <div class="ui__content">
        <MyBadge variant="primary"> Primary </MyBadge>
        <MyBadge variant="success"> Success </MyBadge>
        <MyBadge variant="info"> Info </MyBadge>
        <MyBadge variant="muted"> Muted </MyBadge>
      </div>
    </div>

    <!-- Button -->
    <div class="ui_container">
      <h1 class="ui__title">Button</h1>
      <div class="ui__content">
        <MyButton variant="primary"> Primary </MyButton>
        <MyButton variant="ghost"> Ghost </MyButton>
        <MyButton variant="outline"> Outline </MyButton>
        <MyButton :disabled="true"> Disabled </MyButton>
      </div>
    </div>

    <!-- Checkbox -->
    <div class="ui_container">
      <h1 class="ui__title">Checkbox</h1>
      <div class="ui__content">
        <MyCheckbox v-model="isCompleted"> Mark as completed </MyCheckbox>
      </div>
    </div>

    <!-- Input -->
    <div class="ui_container">
      <h1 class="ui__title">Input</h1>
      <div class="ui__content">
        <MyInput v-model="inputText" placeholder="Default" />
        <MyInput
          v-model="inputText"
          errorText="Something went wrong"
          placeholder="With error"
          :isError
        />
        <MyInput v-model="inputText" placeholder="Disabled" :isDisabled />
      </div>
    </div>

    <!-- Select -->
    <div class="ui_container">
      <h1 class="ui__title">Select</h1>
      <div class="ui__content">
        <MySelect v-model="category" :options="categoryOptions" placeholder="Select Category" />

        <MySelect
          v-model="category"
          :options="categoryOptions"
          placeholder="Select Category"
          :isError="true"
          errorText="Category is required"
        />
      </div>
    </div>

    <!-- Tabs -->
    <div class="ui_container">
      <h1 class="ui__title">Tabs</h1>
      <div class="ui__content">
        <MyTabs :options="priorityOptions" v-model="priority" />
      </div>
    </div>

    <!-- Toggle -->
    <div class="ui_container">
      <h1 class="ui__title">Toggle</h1>
      <div class="ui__content">
        <MyToggle v-model="isEnabled" />

        <div style="display: flex; align-items: center; gap: 8px">
          <MyToggle v-model="isCompleted" />
          <span>Mark as completed</span>
        </div>

        <MyToggle v-model="isEnabled" :disabled="true" />
      </div>
    </div>

    <!-- Textarea -->
    <div class="ui_container">
      <h1 class="ui__title">Textarea</h1>
      <div class="ui__content">
        <MyTextarea v-model="textareaText" placeholder="Default" />
        <MyTextarea
          v-model="textareaText"
          errorText="Something went wrong"
          placeholder="With error"
          :isError
        />
        <MyTextarea v-model="textareaText" placeholder="Disabled" :isDisabled />
      </div>
    </div>

    <!-- Symbols counter -->
    <div class="ui_container">
      <h1 class="ui__title">Symbols Counter</h1>
      <MySymbolsCounter
        v-model="textareaText"
        :maxSymbols="200"
        style="margin-bottom: 8px; justify-content: end"
      />
      <div class="ui__content">
        <MyTextarea v-model="textareaText" placeholder="Default" />
      </div>
    </div>

    <!-- DatePicker -->
    <div class="ui_container">
      <h1 class="ui__title">DatePicker</h1>
      <div class="ui__content">
        <MyDatePicker v-model="taskDate" label="Due Date" />
        <MyDatePicker
          v-model="taskDate"
          label="Due Date"
          :min="new Date().toISOString().split('T')[0]"
        />
        <MyDatePicker
          v-model="taskDate"
          label="Due Date"
          :isError="true"
          errorText="Date is required"
        />
        <MyDatePicker v-model="taskDate" label="Due Date" disabled />
      </div>
    </div>

    <!-- TimePicker -->
    <div class="ui_container">
      <h1 class="ui__title">TimePicker</h1>
      <div class="ui__content">
        <MyTimePicker v-model="taskTime" label="Time" />
        <MyTimePicker v-model="taskTime" label="Meeting Time" />
        <MyTimePicker v-model="taskTime" label="Meeting Time" disabled />
      </div>
    </div>
  </main>
</template>

<style>
.ui__main {
  display: flex;
  flex-direction: column;
  gap: 48px;
}
.ui__title {
  font-size: 24px;
  margin-bottom: 12px;
  font-weight: 800;
}
.ui__content {
  display: flex;
  gap: 16px;
}
</style>
