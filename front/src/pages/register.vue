<template>
  <main class="registration-form">
    <div class="container">
      <h1 class="registration-form__title">Registration</h1>
      <div class="registration-form__form-wrapper">
        <form @submit.prevent="handleRegistration()">
          <Input v-model="name" placeholder="Name" />
          <Input v-model="email" :rules="emailRules" placeholder="Email" />
          <Input
            v-model="password"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            placeholder="Password"
          />
          <Input
            v-model="repeatPassword"
            :rules="repeatPasswordRules"
            type="password"
            placeholder="Repeat Password"
          />
          <div class="registration-form__button-holder">
            <Button
              size="large"
              class="registration-form__submit-button"
              @click.prevent="router.push('/login')"
            >
              LogIn
            </Button>
            <Button
              size="large"
              class="registration-form__submit-button"
              type="primary"
              :disabled="!buttonEnabled"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
<script setup>
import "@varlet/ui/lib/input/style/index";
import Input from "@varlet/ui/lib/input/Input";
import "@varlet/ui/lib/button/style/index";
import Button from "@varlet/ui/lib/button/Button";
import { useToast } from "vue-toastification";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();
const store = useStore();
const name = ref("");
const email = ref("");
const password = ref("");
const repeatPassword = ref("");
const show = ref(false);

const emailRules = [
  (input) =>
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input) || "Incorrect Email",
  (input) => input.length > 3 || "Email too short",
];

const passwordRules = [(input) => input.length > 6 || "Password too short"];

const repeatPasswordRules = [
  ...passwordRules,
  (input) => input === password.value || "Passwords is not the same",
];

const handleRegistration = () => {
  store
    .dispatch("register", {
      email: email.value,
      password: password.value,
      name: name.value,
    })
    .then(() => router.push("/"))
    .then(() => toast.success("Registration successful"))
    .catch((error) =>
      toast.error(`Error occupy while registration! ${error.message}`)
    );
};

const buttonEnabled = computed(() => {
  const emailValid = emailRules.every(
    (rule) => typeof rule(email.value) !== "string"
  );
  const passwordValid = passwordRules.every(
    (rule) => typeof rule(password.value) !== "string"
  );

  const secondPasswordValid = repeatPasswordRules.every(
    (rule) => typeof rule(repeatPassword.value) !== "string"
  );
  return emailValid && passwordValid && secondPasswordValid && name.value;
});
</script>
<style scoped lang="scss">
.registration-form {
  width: 100%;
  height: 100vh;
  display: flex;

  &__title {
    font-family: sans-serif;
    font-size: 2.5rem;
    background-color: rgb(91, 219, 101);
    padding: 10px;
    margin-bottom: 10px;
  }

  &__form-wrapper {
    width: 85%;
    margin: 0 auto 15px;
  }

  &__button-holder {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  &__submit-button {
    display: block;
    margin: 15px auto 0;
  }
}
.container {
  max-width: 500px;
  width: 90%;
  margin: auto;
}
</style>
