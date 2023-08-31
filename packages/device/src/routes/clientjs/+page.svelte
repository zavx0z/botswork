<script lang="ts">
	import { ClientJS } from 'clientjs'
	import Editor from '../editor/Editor.svelte'
	const client = new ClientJS()
	// @ts-ignore
	const browserData = JSON.stringify(client.getBrowserData(), (k, v) => (v === undefined ? 'undefined' : v), '\t')
	// @ts-ignore
	const isFont = client.isFont()
</script>

<div class="flex h-screen flex-col gap-2 pl-4 pt-4">
	<div class="flex w-full">
		<a href="/" class="text-primary-500 text-lg underline">{`<`} Home</a>
		<h1 class="text-primary-500 flex-1 text-center text-xl font-bold">ClientJS</h1>
	</div>
	<div class="h-full overflow-auto">
		<a href="https://clientjs.org/#Fingerprints" class="text-tertiary-500 flex-1 text-center text-xl font-bold">Fingerprint Methods</a>
		<p>client.getFingerprint():<span class="text-secondary-500"> {client.getFingerprint()}</span></p>
		<p>client.getCustomFingerprint(client.getCanvasPrint()): {client.getCustomFingerprint(client.getCanvasPrint())}</p>
		<br />
		<a href="https://clientjs.org/#UserAgent" class="text-tertiary-500 flex-1 text-center text-xl font-bold">UserAgent Methods</a>
		<p>client.getUserAgent(): <span class="text-secondary-500">{client.getUserAgent()}</span></p>
		<p>client.getUserAgentLowerCase(): <span class="text-secondary-500">{client.getUserAgentLowerCase()}</span></p>
		<br />
		<a href="https://clientjs.org/#Browser" class="text-tertiary-500 flex-1 text-center text-xl font-bold">Browser Methods</a>
		<p>client.getBrowserData()</p>
		<Editor code={browserData} lang="json" />
		<p>client.getBrowser(): <span class="text-secondary-500">{client.getBrowser()}</span></p>
		<p>client.getBrowserVersion(): <span class="text-secondary-500">{client.getBrowserVersion()}</span></p>
		<p>client.getBrowserMajorVersion(): <span class="text-secondary-500">{client.getBrowserMajorVersion()}</span></p>
		<p>client.isIE(): <span class="text-secondary-500">{client.isIE()}</span></p>
		<p>client.isChrome(): <span class="text-secondary-500">{client.isChrome()}</span></p>
		<p>client.isFirefox(): <span class="text-secondary-500">{client.isFirefox()}</span></p>
		<p>client.isSafari(): <span class="text-secondary-500">{client.isSafari()}</span></p>
		<p>client.isOpera(): <span class="text-secondary-500">{client.isOpera()}</span></p>
		<br />
		<a href="Engine Methods" class="text-tertiary-500 flex-1 text-center text-xl font-bold">Engine Methods</a>
		<p>client.getEngine(): <span class="text-secondary-500">{client.getEngine()}</span></p>
		<p>client.getEngineVersion(): <span class="text-secondary-500">{client.getEngineVersion()}</span></p>
		<br />
		<a href="https://clientjs.org/#OS" class="text-tertiary-500 flex-1 text-center text-xl font-bold">OS Methods</a>
		<p>client.getOS(): <span class="text-secondary-500">{client.getOS()}</span></p>
		<p>client.getOSVersion(): <span class="text-secondary-500">{client.getOSVersion()}</span></p>
		<p>client.isWindows(): <span class="text-secondary-500">{client.isWindows()}</span></p>
		<p>client.isMac(): <span class="text-secondary-500">{client.isMac()}</span></p>
		<p>client.isLinux(): <span class="text-secondary-500">{client.isLinux()}</span></p>
		<p>client.isUbuntu(): <span class="text-secondary-500">{client.isUbuntu()}</span></p>
		<p>client.isSolaris(): <span class="text-secondary-500">{client.isSolaris()}</span></p>
		<br />
		<a href="https://clientjs.org/#Device" class="text-tertiary-500 flex-1 text-center text-xl font-bold">Device Methods</a>
		<p>client.getDevice(): <span class="text-secondary-500">{client.getDevice()}</span></p>
		<p>client.getDeviceType(): <span class="text-secondary-500">{client.getDeviceType()}</span></p>
		<p>client.getDeviceVendor(): <span class="text-secondary-500">{client.getDeviceVendor()}</span></p>
		<br />
		<a href="https://clientjs.org/#CPU" class="text-tertiary-500 flex-1 text-center text-xl font-bold">CPU Methods</a>
		<p>client.getCPU(): <span class="text-secondary-500">{client.getCPU()}</span></p>
		<br />
		<a href="https://clientjs.org/#Mobile" class="text-tertiary-500 flex-1 text-center text-xl font-bold">Mobile Methods</a>
		<p>client.isMobile(): <span class="text-secondary-500">{client.isMobile()}</span></p>
		<p>client.isMobileMajor(): <span class="text-secondary-500">{client.isMobileMajor()}</span></p>
		<p>client.isMobileAndroid(): <span class="text-secondary-500">{client.isMobileAndroid()}</span></p>
		<p>client.isMobileOpera(): <span class="text-secondary-500">{client.isMobileOpera()}</span></p>
		<p>client.isMobileWindows(): <span class="text-secondary-500">{client.isMobileWindows()}</span></p>
		<p>client.isMobileBlackBerry(): <span class="text-secondary-500">{client.isMobileBlackBerry()}</span></p>
		<br />
		<a href="https://clientjs.org/#iOS" class="text-tertiary-500 flex-1 text-center text-xl font-bold">iOS Methods</a>
		<p>client.isMobileIOS(): <span class="text-secondary-500">{client.isMobileIOS()}</span></p>
		<p>client.isIphone(): <span class="text-secondary-500">{client.isIphone()}</span></p>
		<p>client.isIpad(): <span class="text-secondary-500">{client.isIpad()}</span></p>
		<p>client.isIpod(): <span class="text-secondary-500">{client.isIpod()}</span></p>
		<br />
		<a href="https://clientjs.org/#Screen" class="text-tertiary-500 flex-1 text-center text-xl font-bold">Screen Methods</a>
		<p>client.getScreenPrint(): <span class="text-secondary-500">{client.getScreenPrint()}</span></p>
		<p>client.getColorDepth(): <span class="text-secondary-500">{client.getColorDepth()}</span></p>
		<p>client.getCurrentResolution(): <span class="text-secondary-500">{client.getCurrentResolution()}</span></p>
		<p>client.getAvailableResolution(): <span class="text-secondary-500">{client.getAvailableResolution()}</span></p>
		<p>client.getDeviceXDPI(): <span class="text-secondary-500">{client.getDeviceXDPI()}</span></p>
		<p>client.getDeviceYDPI(): <span class="text-secondary-500">{client.getDeviceYDPI()}</span></p>
		<br />
		<a href="https://clientjs.org/#Plugin" class="text-tertiary-500 flex-1 text-center text-xl font-bold">Plugin Methods</a>
		<p>client.getPlugins(): <span class="text-secondary-500">{client.getPlugins()}</span></p>
		<p>client.isJava(): <span class="text-secondary-500">{client.isJava()}</span></p>
		<p>client.getJavaVersion(): <span class="text-secondary-500">// functional only in java and full builds, throws an error otherwise</span></p>
		<p>client.isFlash(): <span class="text-secondary-500">{client.isFlash()}</span></p>
		<p>client.getFlashVersion(): <span class="text-secondary-500"> // functional only in flash and full builds, throws an error otherwise</span></p>
		<p>client.isSilverlight(): <span class="text-secondary-500">{client.isSilverlight()}</span></p>
		<p>client.getSilverlightVersion(): <span class="text-secondary-500">{client.getSilverlightVersion()}</span></p>
		<br />
		<a href="https://clientjs.org/#MimeType" class="text-tertiary-500 flex-1 text-center text-xl font-bold">Mime Type Methods</a>
		<p>client.getMimeTypes(): <span class="text-secondary-500">{client.getMimeTypes()}</span></p>
		<p>client.isMimeTypes(): <span class="text-secondary-500">{client.isMimeTypes()}</span></p>
		<br />
		<a href="https://clientjs.org/#Font" class="text-tertiary-500 flex-1 text-center text-xl font-bold">Font Methods</a>
		<p>client.isFont(): <span class="text-secondary-500">{isFont}</span></p>
		<p>client.getFonts(): <span class="text-secondary-500">{client.getFonts()}</span></p>
		<br />
		<a href="https://clientjs.org/#Storage" class="text-tertiary-500 flex-1 text-center text-xl font-bold">Storage Methods</a>
		<p>client.isLocalStorage(): <span class="text-secondary-500">{client.isLocalStorage()}</span></p>
		<p>client.isSessionStorage(): <span class="text-secondary-500">{client.isSessionStorage()}</span></p>
		<p>client.isCookie(): <span class="text-secondary-500">{client.isCookie()}</span></p>
		<br />
		<a href="https://clientjs.org/#Time" class="text-tertiary-500 flex-1 text-center text-xl font-bold">Time Methods</a>
		<p>client.getTimeZone(): <span class="text-secondary-500">{client.getTimeZone()}</span></p>
		<br />
		<a href="https://clientjs.org/#Language" class="text-tertiary-500 flex-1 text-center text-xl font-bold">Language Methods</a>
		<p>client.getLanguage(): <span class="text-secondary-500">{client.getLanguage()}</span></p>
		<p>client.getSystemLanguage(): <span class="text-secondary-500">{client.getSystemLanguage()}</span></p>
		<br />
		<a href="https://clientjs.org/#Canvas" class="text-tertiary-500 flex-1 text-center text-xl font-bold">Canvas Methods</a>
		<p>client.isCanvas(): <span class="text-secondary-500">{client.isCanvas()}</span></p>
		<!-- <p>client.getCanvasPrint(): <span class="text-secondary-500">{client.getCanvasPrint()}</p></span> -->
		<img class="border-2" src={client.getCanvasPrint()} alt={'ps'} />
	</div>
</div>

<style lang="css">
	p {
		@apply text-primary-500;
	}
</style>
