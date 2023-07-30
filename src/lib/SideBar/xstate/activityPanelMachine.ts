import { createMachine } from 'xstate'

export default createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QEMDGAXAlgN0+gngHQD2ADmAHaQDEAwgDIDyAygKIDaADALqKinFYeTMQp8QAD0QB2TtMIBOAEwBGABxKArAGZlnACyaFAGhD5E27ZsL6FdtWu1KlANltKAvh9NosuAiTkVBCEpMhUADaEAGbEERDUAK4UsfFcvEggAkJYouJSCPq2hGoqSvpK0gqOGiZmiKpqinYKVbpKDnIuXj4YOHhEZJSQoeFgUcmpCVPp4tnCeZkFRQolZRVVNUp15giuTS3VSpxqLlrSnt4gvv0BQ8GjkYQA7sh4ACJg6GAY1DM8c0ECzESwaVkIRm00n0nAUmn0Z3Upl22jUq1s9m0+icCkMmm6Vxu-kGQRGYSerw+Xx+6CSKTiEFmmXmuRBoAKSnBkOhsPhiLUyIa5RsLU2+hU0mkLjUmh61z6xMIqAighojAACqwAHJM-hA1n5GRyRSNLTtAxGQUIFTVEUtdQufFufTSLxXCjECBwcREgaAnIiNmSRAAWgqVrDSkInBjsbjsZU+jlvrupIg-uBhoQLitRWaLRc0k0OmlsOTCoGgWGIXJ4wzBtBCHhVpU2hU+eqajk4vKFXLfkr9zJYyiU3rgazxYOjVbnZ0qKtlXbhw0JzOmguBN6A9T1ce40IkwZ48W7Isedk2hOWJcbicSkXwsOYolUpl-duJL3tailPQn2+DATyDAoVE4B96j2NtCEsSwKhcG1XAUFQP0VZVVXTZl9QnRtV0IM59DRNRJUqM4IN2Y55DjVQryOLFXTdIA */
	id: 'activityPanel',
	initial: 'opened',
	states: {
		opened: {
			on: { 'CLOSE': 'closed' }
		},
		closed: {
			on: { 'OPEN': 'opened' }
		}
	}
})