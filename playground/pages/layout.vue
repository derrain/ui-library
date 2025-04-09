<script setup>
  import { ref } from 'vue';
  import PlaygroundWrapper from '~/components/PlaygroundWrapper.vue';
  import NuedRow from '~~/src/components/nued/NuedRow.vue';
  import NuedColumn from '~~/src/components/nued/NuedColumn.vue';

  const componentTitle = 'Layout (Row and Column)';
  const componentDescription = 'A flexible Row & Column layout system implmented using the CSS flexbox layout.';

  const model = ref({
    hAlign: 'center',
    vAlign: 'center',
    rowSize: 'large',
    columns: [
      { colSize: 'full' },
      { colSize: '1' },
      { colSize: 'onefourth' },
      { colSize: '1/3' },
      { colSize: '1/5' },
      { colSize: 'onefifth' },
      { colSize: 'onefifth' },
      { colSize: '1/3' },
      { colSize: '1/2' },
      { colSize: '1/4' },
      { colSize: 'onefourth' }
    ]
  });

  const controls = [
    { label: 'Horizontal Align', type: 'select', options: ['left', 'center', 'right'], model: 'hAlign' },
    { label: 'Vertical Align', type: 'select', options: ['top', 'center', 'bottom'], model: 'vAlign' },
    { label: 'Row Size', type: 'select', options: ['small', 'medium', 'large'], model: 'rowSize' }
  ];

  const usageCode = `
    <NuedRow
      hAlign="center" // Align item horizontally. Default is set to 'center';
      vAlign="center" // Align items vertically. Default is set to 'center';
      rowSize="large" // Define max width of row between 'small' | 'medium' | 'large'. Default is set to 'large';
    >
      <NuedColumn
        colSize="1/2" // Choose from 'onefifth' | '1/5' | 'onefourth' | '1/4' | 'onethird' | '1/3' | 'half' | '1/2' | 'full' | '1' column sizes. Default is '1'.
      >
        Column 1
      </Column>
      <NuedColumn
        colSize="1/2"
      >
        Column 2
      </Column>
    </Row>
  `;
</script>

<template>
  <PlaygroundWrapper
    :title="componentTitle"
    :description="componentDescription"
    :controls="controls"
    :model="model"
    :usageCode="usageCode"
  >
    <template #default="{ props }">
      <NuedRow
        :layout="props.layout"
        :hAlign="props.hAlign"
        :vAlign="props.vAlign"
        :rowSize="props.rowSize"
        style="border: 2px solid #666">
        Row
        <NuedColumn
          v-for="(col, index) in model.columns"
          :key="index"
          :colSize="col.colSize"
          style="border: 2px solid #666">
          Column {{ col.colSize }}
        </NuedColumn>
      </NuedRow>
    </template>
  </PlaygroundWrapper>
</template>