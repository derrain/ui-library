<script setup>
  import { ref, watch } from 'vue';

  const props = defineProps({
    title: String,
    description: String,
    controls: Array,
    model: Object,
    usageCode: String
  });

  const localModel = ref({ ...props.model });
  watch(() => props.model, (newModel) => {
    localModel.value = { ...newModel };
  });
</script>

<template>
  <div class="playground-wrapper">
    <section>
      <h2 class="page-header">
        {{ title }}
      </h2>
      <p>
        {{ description }}
      </p>
    </section>

    <!-- Component Preview -->
    <section>
      <div class="preview">
        <slot :props="localModel"></slot>
      </div>
    </section>

    <section>
      <h3>Properties</h3>

      <div class="playground-container">
        <div class="controls">
          <div
            v-for="control in controls"
            :key="control.model"
            class="control-group">
            <label :for="control.model">
              {{ control.label }}
            </label>
            <input
              v-if="control.type === 'text'"
              v-model="localModel[control.model]"
              :id="control.model"
              type="text"
            />
            <select
              v-else-if="control.type === 'select'"
              v-model="localModel[control.model]"
              :id="control.model">
              <option
                v-for="option in control.options"
                :key="option"
                :value="option">
                {{ option }}
              </option>
            </select>
            <input
              v-else-if="control.type === 'checkbox'"
              v-model="localModel[control.model]"
              :id="control.model"
              type="checkbox"
            />
          </div>
        </div>
      </div>
    </section>

    <section>
      <h3>Usage</h3>

      <div class="documentation">
        <pre>
          <code>
            {{ usageCode }}
          </code>
        </pre>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  @use '~/assets/colors' as *;

  .playground-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;

    .preview {
      min-height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      padding: 1rem;
      border: 1px solid $darkgrey-1;
      border-radius: 8px;
    }

    .playground-container {
      display: flex;
      gap: 1rem;

      .controls {
        background: $lightgrey;
        width: 250px;
        padding: .75rem;
        border-radius: 8px;

        .control-group {
          margin-bottom: .5rem;

          label {
            font-weight: 400;
            display: block;
            margin-bottom: 5px;
          }

          input,
          select {
            width: 100%;
            padding: 8px;
            border: 1px solid $darkgrey-1;
            border-radius: 5px;
          }
        }
      }
    }

    .documentation {
      padding: 1rem;
      border: 1px solid $darkgrey-1;

      pre {
        background: $lightgrey;
        padding: .5rem;
        border-radius: 5px;
        overflow-x: auto;
      }
    }
  }
</style>