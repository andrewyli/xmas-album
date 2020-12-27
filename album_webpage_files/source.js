try {
    if (window.localStorage && ! localStorage.getItem( 'storeSession' ) ) {
        localStorage.setItem('storeSession', '' + ( new Date() ).getTime() );
    }
} catch (e) {
    // Do nothing.
}
