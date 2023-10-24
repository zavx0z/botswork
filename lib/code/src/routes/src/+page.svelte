<script>
  import Prism from "prismjs"
  import "prismjs/components/prism-javascript.js"
  import "prismjs/plugins/keep-markup/prism-keep-markup"
  import { insertFolds } from "$lib/plugins/prismFold"
  import { onMount, tick } from "svelte"
  onMount(async () => {
    await tick()
    Prism.hooks.add("before-all-elements-highlight", ({ elements }) => elements.forEach(insertFolds))
    Prism.highlightAll()
  })
  export let data
</script>

<div>
  <h1 class="pb-4 pt-2 text-center text-lg">Источники кода</h1>
</div>
<div class="flex flex-wrap gap-1">
  <div>
    <h1 class="text-center">HTML</h1>
    <div>
      <pre class="language-js">
		<code class="language-js"
          >{`  function createDependencyResolver(entryMap) {
			/** @type {Object<string, StringSet>} */
			var map = {};
			var _stackArray = [];
	
			/**
			 * Adds the dependencies of the given component to the dependency map.
			 *
			 * @param {string} id
			 * @param {string[]} stack
			 */
			function addToMap(id, stack) {
				if (id in map) {
					return;
				}
	
				stack.push(id);
	
				// check for circular dependencies
				var firstIndex = stack.indexOf(id);
				if (firstIndex < stack.length - 1) {
					throw new Error('Circular dependency: ' + stack.slice(firstIndex).join(' -> '));
				}
	
				/** @type {StringSet} */
				var dependencies = {};
	
				var entry = entryMap[id];
				if (entry) {
					/**
					 * This will add the direct dependency and all of its transitive dependencies to the set of
					 * dependencies of entry.
					 *
					 * @param {string} depId
					 * @returns {void}
					 */
					function handleDirectDependency(depId) {
						if (!(depId in entryMap)) {
							throw new Error(id + ' depends on an unknown component ' + depId);
						}
						if (depId in dependencies) {
							// if the given dependency is already in the set of deps, then so are its transitive deps
							return;
						}
	
						addToMap(depId, stack);
						dependencies[depId] = true;
						for (var transitiveDepId in map[depId]) {
							dependencies[transitiveDepId] = true;
						}
					}
	
					forEach(entry.require, handleDirectDependency);
					forEach(entry.optional, handleDirectDependency);
					forEach(entry.modify, handleDirectDependency);
				}
	
				map[id] = dependencies;
	
				stack.pop();
			}
	
			return function (id) {
				var deps = map[id];
				if (!deps) {
					addToMap(id, _stackArray);
					deps = map[id];
				}
				return deps;
			};
		}`}
		</code>
	  </pre>
    </div>
  </div>

  <div>
    <h1 class="text-center">строка</h1>
    <div>
      <pre class="language-js">
		<code>
			{@html data.str}
		</code>
	  </pre>
    </div>
  </div>

  <div>
    <h1 class="text-center">файл</h1>
    <p class="text-error-500">* При чтении из файла, фолдинг работает через жопу</p>
    <div>
      <pre class="language-js">
		<code>
			{@html data.file}
		</code>
	  </pre>
    </div>
  </div>
</div>
