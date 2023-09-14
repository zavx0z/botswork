<script lang="ts">
    import type {PageData} from './$types'
    // import { ClientJS } from 'clientjs'
    import {ButtonCallScreenShare} from 'ui/call'
    import {enhance} from '$app/forms'
    import {Io} from 'channels'


    export let data: PageData
    let {useMediaDeviceMachine, sio} = data

    interface Client {
        uuid: string
        presence_ref: string
        screen: 'mirror' | 'share'
        os: string
        online_at: string
        email: string
        browser: string
    }

    let message = ''
    let realtime: Client[] = []
</script>
<form method="post" class="p-4 flex flex-col gap-4 w-1/2" use:enhance={({ formElement, formData, action, cancel }) => {
    sio.emit(Io.CONNECT, message )
    cancel()
}}>
    <input type="text" bind:value={message} name="message" class="bg-surface-500"/>
    <button type="submit" class="bg-blue-300 p-2 rounded-md">
        Отправить сообщение
    </button>
</form>
<div class="flex flex-col gap-2 p-2">
    {#each realtime as item (item.presence_ref)}
        <div class="bg-surface-700 flex w-96 flex-col rounded-md p-2">
            <p class="text-secondary-400"><span class="text-primary-500">{item.uuid}</span></p>
            <p class="text-secondary-400"><span class="text-primary-500">{item.screen}:</span> {item.email}</p>
            <p class="text-secondary-400"><span class="text-primary-500">Операционная система:</span> {item.os}</p>
            <p class="text-secondary-400"><span class="text-primary-500">Браузер:</span> {item.browser}</p>
            <ButtonCallScreenShare title={'Запросить экран'} size={'sm'}/>
        </div>
    {/each}
</div>
<video use:useMediaDeviceMachine autoplay playsinline muted class="h-1/2 w-full">
    <track kind="captions" src=""/>
</video>
