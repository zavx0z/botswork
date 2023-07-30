import { createMachine, send } from 'xstate'

const layoutMashine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5QBsCGBPA9gVwC4DoBbMAO2wBkwAzAzAB1IGIBjZTWMAAmWt0+LIBtAAwBdRKDrsAlrmmYSEkAA9EAdgDMa-AE4ATAEYAHAFY1wzQBYDavQBoQ6RJeGX8J4Z8OeAbDp8mOgC+QQ5oWHhEpBS8+PSk+LDSEGAAQqgATvhUmMgQjNgkOXki4kggUklyCkqqCJZqOvhGBnqWOvqWDe1qlg5OCHpG2h2jaj4+RnqeRiFhGDgEAjE0cQwkiclpmfiFxfn7pUqVsvKK5XUNTS1tHW3dOr39iBoaRvien8IGJl06whoTHMQOFFlEyJRVvENkkUuksgB3VCyAAiYFwYGYuEYhzExxk1XOoDqegC7h0WhMGnawh842e9RM7w8nwMGkePkBemBoMiy0htHWmzhOyRqPRmOxe1yECO5ROhNqiFJJnJlOp-zpPgZr2EHy+PgB30BPksPIWfOiAvwrHYYEY0O4vH40TlkgJZyVCE0I0MpnMVhs9kcyrp7i+Bk5eg6rh85oiS2iACVpFAABaCpi4TBQKA8N0VD01C6ISPXIYGAyWPQaNnmIxGBl07TtMYdLSmuOhEEWxNkFPpgi2jiMbO5-N4+VFokqUt+ZoVqs1uvCBsM2zaFmfSxGTy-bnAkiYFLwcq83D4qqeksIAC0hoZ9+E8bB-N4l9OxeJiFvrQZem0L4AV+Hddy0F9LQhWJoQ-RUbw0bUQwQSs3CAmtbDaYRfggvsVkzGEtnhWDr2-BAjD6JDpgMfVPkBJkENXA95gTcE8LWBJYW2LJ9mIr9ZwQJl3n0YxTTA-RGh1awaNZED-jNbtz1Y61oWFLjdiKGVeJnOotDccxawMOSdFMawKIGXVwy8GlhEMU0cKU6ChU4+F8DFXA0QxLEtK9NlgwGSwTD0fAJgmfQWi8Rp7LfVZhzAbybx0StdEmNReiMTkTB+RtKPGaSbNcH1piBBTe1YgcM3i0i2gZQI9S3AEG3ZNou2Y19k1TDN2JnBUSP4gCmlaVsbCmIwuRMJt0ukgxhGMqZPAMKL2sHG02A4Sr+NsCaNHwVtjKZIYZprEIQiAA */
		id: 'layout',
		type: 'parallel',
		states: {
			menuLeft: {
				initial: 'open',
				states: {
					open: {
						initial: 'sideBar',
						on: { 'close left menu': 'close' },
						states: {
							sideBar: {
								initial: 'waitDetect',
								states: {
									fold: { on: { unfold: 'unfold' } },
									unfold: { on: { fold: 'fold' } },
									waitDetect: {
										on: {
											fold: 'fold',
											unfold: 'unfold'
										}
									}
								}
							}
						}
					},
					close: {
						on: { 'open left menu': 'open' }
					}
				}
			},
			menuRight: {
				initial: 'close',
				states: {
					open: {
						on: { toggle: 'close' }
					},
					close: {
						on: {
							toggle: 'open'
						}
					}
				}
			}
		}
	},
	{
		guards: {}
	}
)
export default layoutMashine
