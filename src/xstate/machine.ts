import { browser } from '$app/environment'
import { createMachine } from 'xstate'

const machine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5QQJawA4BsCGBPAdAK4B2EYAZisZAMRkAuYAxvQNoAMAuoqOgPawU9FH2I8QAD0QBGAJzsAHPgDsAVgBs7VQGZ16gCyyATNP0AaELhmqly6Ufnb2+6e2X720gL5eLqDDgEJGSU1BB0YIwsrNLcSCD8gsKi4lII0gqy0vj6RsrGCnqGJuaWiKrK6ioOzuqmatrS2j5+aFh4RKQUVLQMzGxGcbwCQiJi8WkZstr4xvlGhQbGphZWCLIKqrOqrvqq7EYa0uoKLSD+7UFdob2R-azaQwkjyeOgk5nZufOLxStl6W02lkOUyO2U2nBclOvnObUCnRCPXCfWi+ieiVGKQmMgUeNmeQKRWWpTW0mU7nw0h26m0HicmyMRjOFwRsAAthEomwuOJMa9UogjE59Pg6YpnLIIQomasZPoZvSDopcvZpNSWfCOhyufdYnyXmNBQgHKYxR4FJLpSU5ekFTl2E4jCqTCZ7JqAtrOaiBhjDdj3og6XTZuobFbtDL-mT7UrnQpVW7VB7LvgdT6Hn6kkacQg9nkcmHLYZrdJbU1RWGnS61RkUwj2Si7tFefF+TnAybadlndNPNp3HTVLaNCDnC5abJ9JtlAn6x1G7rovq2-63pIg6YjGL3HZdLPPI6R+ox-oJ8DpxU57DWQum9zWIMDdmAxu84T8Ds6cdhY69MfT3PKcZ2vVpPQIRcM0eZ8sXXNJp3sfB+wnX9dHUACkLPY4LxA-R5wITAoCXHks1g40gSMKpBxMdg3E2IF0IBKV2BUPQfxlPQDHw-BCOImJSIFXNIwcfAFF3Jp1APVxtFtZjWLqdQFkoopuN4jMn1XF84MQFxZ3wSjv0Upw0Nk5QWMqBSlM4vCby1AiiKggSOzfM8IVEvEUOM-8mLM+T2OUrjbPA-AJEwPjW2GLTyLMmYpUU1QKkohUp3LIFsmLWkdlUPI9FkbjQr4ldIrIoSsiqac8lUaZDiyDRUsaUTakhakcpPfKwvUpzX3giSqSMfQ90ky0ywBJoGoy5rsosvKgtTArHJgwTOwVPTFIGiSpPq9Kmqy1qZrAub5ubEjFuc+Csm3Q9jjPJxFOUcsLMLSSdgURpMmmfKjofIrnii3MdnYKpIwTH8vPu0bHv0PQ1AyN7ZA+2aEQkL77g04qlrfHQPCpSNPL-cGyUh6GXrhhGDqRlHomgzSSs7BL8TxEGjPxh69CemHXqmBHYWIPgyHgeJbzWdGzpkSTZFtAaqR0ftXWUZTk0Rjpgm6MJTu6mR5YJ6xlH0uwTzPMF5AqbiOXV7STTGsUMgStC-kYskKj144p2nWQqq0Gzybvc3jWFacqW+DiPDMh3yhPTCgMvWcvbhYLCN93MHBlUSDeOeX7GcUzzLYxSOJUpWCFCxPO2a0UBvcIyT1cCXRrSxqocmvbPswEuXJOEFI1pOw3G0ZPhwhgPZGJ2GucVnwgA */
		id: 'display',
		initial: 'undefined',
		states: {
			undefined: {
				on: {
					detect: [
						{
							target: 'sm',
							cond: 'sm'
						},
						{
							target: 'md',
							cond: 'md'
						},
						{
							target: 'lg',
							cond: 'lg'
						},
						{
							target: 'xl',
							cond: 'xl'
						},
						{
							target: 'xxl',
							cond: 'xxl'
						}
					]
				}
			},
			sm: {
				on: {
                    setSize: {
                        actions: ['windowSetSize'],
                        target: 'sm'
                    },
					detect: [
						{
							target: 'md',
							cond: 'md'
						},
						{
							target: 'lg',
							cond: 'lg'
						},
						{
							target: 'xl',
							cond: 'xl'
						},
						{
							target: 'xxl',
							cond: 'xxl'
						}
					]
				}
			},
			md: {
				on: {
                    setSize: {
                        actions: ['windowSetSize'],
                        target: 'md'
                    },
					detect: [
						{
							target: 'sm',
							cond: 'sm'
						},
						{
							target: 'lg',
							cond: 'lg'
						},
						{
							target: 'xl',
							cond: 'xl'
						},
						{
							target: 'xxl',
							cond: 'xxl'
						}
					]
				}
			},
			lg: {
				on: {
                    setSize: {
                        actions: ['windowSetSize'],
                        target: 'lg'
                    },
					detect: [
						{
							target: 'sm',
							cond: 'sm'
						},
						{
							target: 'md',
							cond: 'md'
						},
						{
							target: 'xl',
							cond: 'xl'
						},
						{
							target: 'xxl',
							cond: 'xxl'
						}
					]
				}
			},
			xl: {
				on: {
                    setSize: {
                        actions: ['windowSetSize'],
                        target: 'xl'
                    },
					detect: [
						{
							target: 'sm',
							cond: 'sm'
						},
						{
							target: 'md',
							cond: 'md'
						},
						{
							target: 'lg',
							cond: 'lg'
						},
						{
							target: 'xxl',
							cond: 'xxl'
						}
					]
				}
			},
			xxl: {
				on: {
                    setSize: {
                        actions: ['windowSetSize'],
                        target: 'xxl'
                    },
					detect: [
						{
							target: 'sm',
							cond: 'sm',
						},
						{
							target: 'md',
							cond: 'md'
						},
						{
							target: 'lg',
							cond: 'lg'
						},
						{
							target: 'xl',
							cond: 'xl'
						}
					]
				}
			}
		},
        predictableActionArguments: true,
        preserveActionOrder: true,
	},
	{
        actions: {
            windowSetSize: (args) =>{
                if (browser){
                    console.log(args )
                    // width:number, height: number
                    // window.innerWidth = width
                    // window.innerHeight = height
                }
            }
        },
		guards: {
			sm: (_, { payload: { width } }) => width < 640,
			md: (_, { payload: { width } }) => 640 < width && width < 780 ,
			lg: (_, { payload: { width } }) => 780 < width && width < 1024,
			xl: (_, { payload: { width } }) => 1024 < width && width < 1280,
			xxl: (_, { payload: { width } }) => 1280 < width && width < 1536
		}
	}
)
export default machine
