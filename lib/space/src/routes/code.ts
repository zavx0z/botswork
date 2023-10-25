export const code = `<span class="token keyword">function</span> <span class="token function">createDependencyResolver</span><span class="token punctuation">(</span><span class="token parameter">entryMap</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">/** @type {Object</span><string, stringset=""><span class="token comment">} */</span>
<span class="token keyword">var</span> map <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> _stackArray <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Adds the dependencies of the given component to the dependency map.
 *
 * @param {string} id
 * @param {string[]} stack
 */</span>
<details><summary>			<span class="token keyword"></span><span class="fl"><span class="token keyword">function</span> <span class="token function">addToMap</span><span class="token punctuation">(</span><span class="token parameter">id<span class="token punctuation">,</span> stack</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span><span class="token punctuation"></span></summary><span class="token punctuation"></span>
<details><summary>				<span class="token keyword"></span><span class="fl"><span class="token keyword">if</span> <span class="token punctuation">(</span>id <span class="token keyword">in</span> map<span class="token punctuation">)</span> <span class="token punctuation">{</span></span><span class="token punctuation"></span></summary><span class="token punctuation"></span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
</details><span class="ll">				</span><span class="token punctuation">}</span>

    stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// check for circular dependencies</span>
    <span class="token keyword">var</span> firstIndex <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<details><summary>				<span class="token keyword"></span><span class="fl"><span class="token keyword">if</span> <span class="token punctuation">(</span>firstIndex <span class="token operator">&lt;</span> stack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span><span class="token punctuation"></span></summary><span class="token punctuation"></span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'Circular dependency: '</span> <span class="token operator">+</span> stack<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>firstIndex<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">' -&gt; '</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</details><span class="ll">				</span><span class="token punctuation">}</span>

    <span class="token comment">/** @type {StringSet} */</span>
    <span class="token keyword">var</span> dependencies <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">var</span> entry <span class="token operator">=</span> entryMap<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">;</span>
<details><summary>				<span class="token keyword"></span><span class="fl"><span class="token keyword">if</span> <span class="token punctuation">(</span>entry<span class="token punctuation">)</span> <span class="token punctuation">{</span></span><span class="token punctuation"></span></summary><span class="token punctuation"></span>
        <span class="token comment">/**
         * This will add the direct dependency and all of its transitive dependencies to the set of
         * dependencies of entry.
         *
         * @param {string} depId
         * @returns {void}
         */</span>
<details><summary>					<span class="token keyword"></span><span class="fl"><span class="token keyword">function</span> <span class="token function">handleDirectDependency</span><span class="token punctuation">(</span><span class="token parameter">depId</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span><span class="token punctuation"></span></summary><span class="token punctuation"></span>
<details><summary>						<span class="token keyword"></span><span class="fl"><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>depId <span class="token keyword">in</span> entryMap<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span><span class="token punctuation"></span></summary><span class="token punctuation"></span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>id <span class="token operator">+</span> <span class="token string">' depends on an unknown component '</span> <span class="token operator">+</span> depId<span class="token punctuation">)</span><span class="token punctuation">;</span>
</details><span class="ll">						</span><span class="token punctuation">}</span>
<details><summary>						<span class="token keyword"></span><span class="fl"><span class="token keyword">if</span> <span class="token punctuation">(</span>depId <span class="token keyword">in</span> dependencies<span class="token punctuation">)</span> <span class="token punctuation">{</span></span><span class="token punctuation"></span></summary><span class="token punctuation"></span>
                <span class="token comment">// if the given dependency is already in the set of deps, then so are its transitive deps</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
</details><span class="ll">						</span><span class="token punctuation">}</span>

            <span class="token function">addToMap</span><span class="token punctuation">(</span>depId<span class="token punctuation">,</span> stack<span class="token punctuation">)</span><span class="token punctuation">;</span>
            dependencies<span class="token punctuation">[</span>depId<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<details><summary>						<span class="token keyword"></span><span class="fl"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> transitiveDepId <span class="token keyword">in</span> map<span class="token punctuation">[</span>depId<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span><span class="token punctuation"></span></summary><span class="token punctuation"></span>
                dependencies<span class="token punctuation">[</span>transitiveDepId<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
</details><span class="ll">						</span><span class="token punctuation">}</span>
</details><span class="ll">					</span><span class="token punctuation">}</span>

        <span class="token function">forEach</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span>require<span class="token punctuation">,</span> handleDirectDependency<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">forEach</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span>optional<span class="token punctuation">,</span> handleDirectDependency<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">forEach</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span>modify<span class="token punctuation">,</span> handleDirectDependency<span class="token punctuation">)</span><span class="token punctuation">;</span>
</details><span class="ll">				</span><span class="token punctuation">}</span>

    map<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> dependencies<span class="token punctuation">;</span>

    stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</details><span class="ll">			</span><span class="token punctuation">}</span>

<details><summary>			<span class="token keyword"></span><span class="fl"><span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span><span class="token punctuation"></span></summary><span class="token punctuation"></span>
    <span class="token keyword">var</span> deps <span class="token operator">=</span> map<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">;</span>
<details><summary>				<span class="token keyword"></span><span class="fl"><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>deps<span class="token punctuation">)</span> <span class="token punctuation">{</span></span><span class="token punctuation"></span></summary><span class="token punctuation"></span>
        <span class="token function">addToMap</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> _stackArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
        deps <span class="token operator">=</span> map<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">;</span>
</details><span class="ll">				</span><span class="token punctuation">}</span>
    <span class="token keyword">return</span> deps<span class="token punctuation">;</span>
</details><span class="ll">			</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</string,>`