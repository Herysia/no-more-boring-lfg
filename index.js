"use strict"

module.exports = function NoMoreBoringLFG(mod) {
    var enabled = true;
    var lfgs;
    var lfgPerPage;
	const listingsPerPage = 16;
    mod.hook('S_SHOW_PARTY_MATCH_INFO', 1, (e) => {
        if (!enabled) return;
		for (var i = 0; i < e.listings.length; i++) {
			var str = e.listings[i].message.toLowerCase();
			if (str.includes('wts') || str.includes('wtb')) {
				e.listings.splice(i, 1);
				i--;
			}
		}
		e.pageCount = parseInt(e.listings % listingsPerPage);
		return true;
    })
    mod.command.add('lfg', () => {
        enabled = !enabled;
        mod.command.message(`Boring lfgs are now ${enabled?'hidden':'displayed'}`);
    })

}
