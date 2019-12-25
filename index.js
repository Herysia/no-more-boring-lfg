"use strict"

module.exports = function NoMoreBoringLFG(mod) {
    var enabled = true;
    var lfgs;
    var lfgPerPage;
    mod.hook('S_SHOW_PARTY_MATCH_INFO', 1, (e) => {
        if (!enabled) return;
        if (e.pageCount == 0) //only one page
        {
            for (var i = 0; i < e.listings.length; i++) {
                var str = e.listings[i].message.toLowerCase();
                if (str.includes('wts') || str.includes('wtb')) {
                    e.listings.splice(i, 1);
                    i--;
                }
            }
            return true;
        } else {
            if (e.pageCurrent == 0) {
                lfgs = [];
                lfgPerPage = e.listrings.length;
            }
            for (var i = 0; i < e.listings.length; i++) {
                var str = e.listings[i].message.toLowerCase();
                if (!(str.includes('wts') || str.includes('wtb'))) {
                    lfgs.push(e.listings[i]);
                }
            }
            if (e.pageCurrent == e.pageCount) {
                var pageCount = parseInt(lfgs.length / lfgPerPage);
                for (var i = 0; i <= pageCount; i++) {
                    mod.send('S_SHOW_PARTY_MATCH_INFO', 1, {
                        pageCurrent: i,
                        pageCount: pageCount,
                        listings: lfgs.slice(lfgPerPage * i, lfgPerPage * (i + 1))
                    })
                }

            }
            return false;
        }
    })
    mod.command.add('lfg', () => {
        enabled = !enabled;
        mod.command.message(`Boring lfgs are now ${enabled?'hidden':'displayed'}`);
    })

}
