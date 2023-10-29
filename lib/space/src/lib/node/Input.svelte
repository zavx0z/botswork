<script lang="ts">
  import Select from "./prop/PropSelect.svelte"
  import Text from "./input/InputText.svelte"
  import CheckBox from "./input/InputCheckBox.svelte"
</script>

<div aria-label="входы" class="grid grid-cols-1 gap-2 py-1">
  <slot {Select} {Text} {CheckBox}/>
</div>
