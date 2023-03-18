<template>
    <div></div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import Qs from 'qs'
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
const VITE_API_ROOT = import.meta.env.VITE_API_ROOT
const VITE_SECRET = import.meta.env.VITE_SECRET
const VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID
export default {
    name: 'callback-url',
    data() {
        return {
            accessToken: null,
            isSuccess: false,
            tokenResult: null
        }
    },
    watch: {
        $route: 'fetchData'
    },
    computed: {
        ...mapState('auth', {
            authRequest: 'request',
            authFailure: 'failure'
        })
    },
    methods: {
        ...mapActions('auth', ['lineLogin']),
        async checkLogin() {
            this.isSuccess = await this.lineLogin(this.accessToken.data)
            if (this.isSuccess) {
                window.location.href = REDIRECT_URI
            } else {
                this.showError = true
            }
        }
    },
    async created() {
        const code = new URLSearchParams(window.location.search).get('code')

        if (code) {
            document.querySelector('html').classList.add('none')
            const redirectUri = REDIRECT_URI + 'callback-url'
            let options = Qs.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                client_id: VITE_CLIENT_ID,
                client_secret: VITE_SECRET
            })
            await axios
                .post('https://api.line.me/oauth2/v2.1/token', options, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then((res) => {
                    this.tokenResult = res.data
                    console.log(res.data)
                })
            let params = {
                code: this.tokenResult.access_token
            }
            this.accessToken = await axios.get(VITE_API_ROOT + '/lineLogin/callback', { params })
            this.checkLogin()
        }
    }
}
</script>
<style>
.none {
    display: none;
}
</style>
