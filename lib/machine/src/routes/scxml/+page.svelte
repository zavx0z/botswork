<script lang="ts">
  import { toMachine } from "$lib"
  const html = String.raw
  const scxml = html`
    <scxml name="MicroWave" xmlns="http://www.w3.org/2005/07/scxml" version="1.0" datamodel="ecmascript" initial="off">
      <datamodel>
        <data id="cook_time" expr="5" />
        <data id="door_closed" expr="true" />
        <data id="timer" expr="0" />
      </datamodel>
      <state id="off">
        <transition event="turn.on" target="on" />
        <invoke src="invoked" />
        <onentry>
          <script src="entry action" />
        </onentry>
      </state>
      <state id="on">
        <initial>
          <transition target="idle" />
        </initial>
        <transition event="turn.off" target="off" />
        <transition cond="timer &gt;= cook_time" target="off" />
        <state id="idle">
          <transition cond="door_closed" target="cooking" />
          <transition event="door.close" target="cooking">
            <assign location="door_closed" expr="true" />
          </transition>
        </state>
        <state id="cooking">
          <transition event="door.open" target="idle">
            <assign location="door_closed" expr="false" />
          </transition>
          <transition event="time">
            <assign location="timer" expr="timer + 1" />
          </transition>
        </state>
      </state>
    </scxml>
  `
  const machine = toMachine(scxml, {})
  console.log(machine)
</script>

<h1>SCXML import</h1>
