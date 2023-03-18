<template>
    <div>
        <DarkModeSwitcher />
        <div class="container sm:px-10">
            <div class="block xl:grid grid-cols-2 gap-4">
                <!-- BEGIN: Login Info -->
                <div class="hidden xl:flex flex-col min-h-screen">
                    <a href="" class="-intro-x flex items-center pt-5">
                        <img alt="Midone Tailwind HTML Admin Template" class="w-6" src="@/assets/images/logo.svg" />
                        <span class="text-white text-lg ml-3"> Techzai </span>
                    </a>
                    <div class="my-auto">
                        <img alt="Midone Tailwind HTML Admin Template" class="-intro-x w-1/2 -mt-16" src="@/assets/images/illustration.svg" />
                        <div class="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                            Đăng nhập tài khoản <br />
                            để sử dụng các tính năng.
                        </div>
                    </div>
                </div>
                <!-- END: Login Info -->
                <!-- BEGIN: Login Form -->
                <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                    <div
                        class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent sm:px-0 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/5 xl:w-auto"
                    >
                        <div class="intro-x caixa__login">
                            <div class="invalid-feedback mb-4" v-if="showError">Thông tin đăng nhập không đúng</div>
                            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
                                <div class="form-row">
                                    <h2 class="login_header intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">Đăng nhập</h2>
                                    <div class="caixa__login-input form-group col">
                                        <Field
                                            name="email"
                                            type="text"
                                            required
                                            class="input py-2 px- bloc intro-x login__input"
                                            :class="{ 'is-invalid': errors.email }"
                                        />
                                        <label for="">Email</label>
                                        <div class="invalid-feedback">{{ errors.email }}</div>
                                    </div>
                                </div>
                                <div class="form-row mt-4 relative">
                                    <div class="caixa__login-input form-group col">
                                        <Field
                                            name="password"
                                            type="password"
                                            required
                                            class="input password-showhide"
                                            :class="{ 'is-invalid': errors.password }"
                                        />
                                        <label for="">Mật khẩu</label>

                                        <div class="invalid-feedback">{{ errors.password }}</div>
                                        <div class="showHide" @click="showHidePassword"><i class="fa-solid fa-eye"></i></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                                        <a href="">Quên mật khẩu?</a>
                                    </div>
                                    <div class="intro-x mt-2 text-center xl:text-left">
                                        <button class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">Đăng nhập</button>
                                    </div>
                                    <!-- Đăng nhập bằng Line -->
                                    <div class="intro-x text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-6 mb-2">
                                        <span class="login-or">Hoặc</span>
                                    </div>
                                    <div class="btn-login flex">
                                        <div class="intro-x mt-1 text-center xl:text-center flex-1">
                                            <button
                                                id="line-login-button"
                                                class="btn hover:bg-green-700 text-white font-bold py-2 px-2 rounded-full text-center"
                                                @click.stop.prevent="clickLineLogin"
                                            >
                                                <img
                                                    class="rounded-full"
                                                    src="https://cdn.tgdd.vn/2020/03/GameApp/image(2)-200x200-10.png"
                                                    alt="Line Login"
                                                    width="30"
                                                    height="30"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <!-- END: Login Form -->
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue'
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import dom from '@left4code/tw-starter/dist/js/dom'
import { Form, Field } from 'vee-validate'
import { mapState, mapActions } from 'vuex'
import * as Yup from 'yup'
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
export default {
    name: 'login-form',
    components: {
        Form,
        Field
    },
    created() {
        onMounted(() => {
            dom('body').removeClass('main').removeClass('error-page').addClass('login')
        })
    },
    data() {
        const schema = Yup.object().shape({
            email: Yup.string().required('Email không được để trống.').email('Email không đúng định dạng.'),
            password: Yup.string().required('Mật khẩu không được để trống.')
        })

        return {
            schema,
            showError: false
        }
    },
    computed: {
        ...mapState('auth', {
            authRequest: 'request',
            authFailure: 'failure'
        })
    },
    methods: {
        ...mapActions('auth', ['login']),
        // submit() {
        //     this.$refs.form.validate(async (valid) => {
        //         alert(111111111);
        //         if (valid) {
        //             const { form } = this;
        //             console.log(form);
        //             const isSuccess = await this.login(form);
        //             if (isSuccess) {
        //                 this.$router.push('/');
        //             }
        //         }
        //     });
        // },
        clear() {
            const { form } = this
            form.account = ''
            form.password = ''
        },
        async onSubmit(values) {
            const isSuccess = await this.login(JSON.stringify(values, null, 4))
            if (isSuccess) {
                this.$router.push('/')
            } else {
                this.showError = true
            }
        },
        clickLineLogin() {
            this.schema = ''
            const redirectUri = REDIRECT_URI+'callback-url'
            const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&state=${state}&scope=openid%20profile`
            window.location.href = url
        },
        showHidePassword() {
            const password = document.querySelector('.password-showhide')
            const showHide = document.querySelector('.fa-solid')
            if (password.type == 'password') {
                password.setAttribute('type', 'text')
                showHide.classList.remove('fa-eye')
                showHide.classList.add('fa-eye-slash')
            } else if (password.type == 'text') {
                password.setAttribute('type', 'password')
                showHide.classList.remove('fa-eye-slash')
                showHide.classList.add('fa-eye')
            }
        }
    }
}
</script>

<style scoped>
/* .invalid-feedback .visible {
    height: 32px;
}
.invalid-feedback {
    overflow: hidden;
    text-align: left;
    padding: 0 16px;
    color: #ff3e72;
    height: 0;
    transition: 0.3s;
} */

.invalid-feedback {
    color: #ff3e72;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

.login_header {
    color: rgb(30, 58, 138) !important;
}

.caixa__login {
    position: absolute;
    top: 50%;
    width: 100%;
    padding: 40px;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(139, 128, 249, 0.6);
    border-radius: 10px;
}

.caixa__login-input .input {
    border: none;
    outline: none;
    box-shadow: none;
    background: transparent;
}
.caixa__login-input {
    position: relative;
}

.caixa__login-input .input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    -webkit-text-fill-color: #333 !important;
}
.caixa__login-input .input:-webkit-autofill {
    -webkit-box-shadow: none;
    -webkit-text-fill-color: #333;
}
.caixa__login h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #000;
    text-align: center;
}

.caixa__login .caixa__login-input {
    position: relative;
}

.caixa__login .caixa__login-input .input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #000;
    margin-bottom: 30px;
    border: none;
    border-bottom: 2px solid #999;
    outline: none;
    background: transparent;
    transition: 0.5s;
}
.caixa__login .caixa__login-input label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #000;
    pointer-events: none;
    transition: 0.5s;
    z-index: 9999;
}
.caixa__login .caixa__login-input .input:focus,
.caixa__login .caixa__login-input .input:valid {
    border-bottom: 2px solid rgb(30, 58, 138);
}
.caixa__login .caixa__login-input .input:focus ~ label,
.caixa__login .caixa__login-input .input:valid ~ label {
    top: -20px;
    left: 0;
    color: rgb(32, 60, 138);
    font-size: 12px;
}
.login-or {
    display: flex;
    color: #999;
}
.login-or::before,
.login-or::after {
    content: '';
    width: 100%;
    height: 1px;
    background: #999;
    margin: auto;
}
.login-or::before {
    margin-right: 1rem;
}
.login-or::after {
    margin-left: 1rem;
}

.showHide {
    position: absolute;
    right: 10px;
    top: 15px;
}
</style>
