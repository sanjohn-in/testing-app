<script setup lang="ts">
const open = defineModel<boolean>({ required: true });
const activeTab = ref<"login" | "register">("login");
const { login } = useStore();
function openLogin() {
	activeTab.value = "login";
	open.value = true;
}

function openRegister() {
	activeTab.value = "register";
	open.value = true;
}

defineExpose({ openLogin, openRegister });

const loginForm = reactive({
	email: "sanjohn.in@gmail.com",
	password: "123456",
});
const regForm = reactive({
	name: "sanjohn",
	email: "sanjohn.in@gmail.com",
	password: "123456",
});

const handleLoginClick = async (tab: "login" | "register") => {
	activeTab.value = tab;
	login("sanjohn.in@gmail.com", "123456");
	open.value = false;
};
</script>

<template>
	<UModal
		v-model:open="open"
		:ui="{
			overlay: 'bg-black/70 ',
			content: 'p-0 bg-transparent  shadow-none rounded-2xl ring-0 ',
		}"
	>
		<template #content>
			<div class="auth-card">
				<!-- TOP BRAND HEADER -->
				<div class="auth-top">
					<div class="auth-top-inner">
						<div class="flex items-center justify-between">
							<div>
								<div
									class="text-[11px] font-semibold tracking-[0.18em] text-black/70"
								>
									WELCOME
								</div>
								<div class="text-xl font-black text-black">
									{{ activeTab === "login" ? "ĐĂNG NHẬP" : "ĐĂNG KÝ" }}
								</div>
							</div>

							<button
								class="h-9 w-9 cursor-pointer rounded-full bg-black/10 hover:bg-black/15 flex items-center justify-center"
								aria-label="Close"
								@click="open = false"
							>
								✕
							</button>
						</div>

						<!-- PILL TABS -->
						<div class="mt-4 auth-tabs">
							<button
								class="auth-tab"
								:class="activeTab === 'login' ? 'is-active' : ''"
								@click="activeTab = 'login'"
							>
								Đăng nhập
							</button>

							<button
								class="auth-tab"
								:class="activeTab === 'register' ? 'is-active' : ''"
								@click="activeTab = 'register'"
							>
								Đăng ký
							</button>
						</div>
					</div>
				</div>

				<!-- FORM BODY -->
				<div class="auth-body">
					<!-- LOGIN -->
					<div v-if="activeTab === 'login'" class="space-y-4">
						<div>
							<label class="auth-label">Email</label>
							<UInput
								v-model="loginForm.email"
								placeholder="you@email.com"
								type="email"
								size="lg"
								class="auth-input"
							/>
						</div>

						<div>
							<label class="auth-label">Mật khẩu</label>
							<UInput
								v-model="loginForm.password"
								placeholder="••••••••"
								type="password"
								size="lg"
								class="auth-input"
							/>
						</div>

						<UButton
							block
							size="lg"
							class="auth-cta"
							@click="handleLoginClick('login')"
						>
							Đăng nhập
						</UButton>

						<div class="auth-footer">
							Chưa có tài khoản?
							<button class="auth-link" @click="activeTab = 'register'">
								Đăng ký
							</button>
						</div>
					</div>

					<!-- REGISTER -->
					<div v-else class="space-y-4">
						<div>
							<label class="auth-label">Tên người dùng</label>
							<UInput
								v-model="regForm.name"
								placeholder="San John"
								size="lg"
								class="auth-input"
							/>
						</div>

						<div>
							<label class="auth-label">Email</label>
							<UInput
								v-model="regForm.email"
								placeholder="you@email.com"
								type="email"
								size="lg"
								class="auth-input"
							/>
						</div>

						<div>
							<label class="auth-label">Mật khẩu</label>
							<UInput
								v-model="regForm.password"
								placeholder="Tối thiểu 8 ký tự"
								type="password"
								size="lg"
								class="auth-input"
							/>
						</div>

						<UButton
							block
							size="lg"
							class="auth-cta"
							@click="handleLoginClick('register')"
						>
							Tạo tài khoản
						</UButton>

						<div class="auth-footer">
							Đã có tài khoản?
							<button class="auth-link" @click="activeTab = 'login'">
								Đăng nhập
							</button>
						</div>
					</div>
				</div>

				<!-- BOTTOM STRIP (black like your header) -->
				<div class="auth-bottom ring-0">
					<div class="text-[11px] text-amber-200/90">
						By continuing you agree to our Terms & Privacy.
					</div>
				</div>
			</div>
		</template>
	</UModal>
</template>

<style scoped>
/* Main card */
.auth-card {
	overflow: hidden;
	border-radius: 22px;
	background: rgba(255, 255, 255, 0.92);
	backdrop-filter: blur(10px);
	box-shadow: 0 22px 60px rgba(0, 0, 0, 0.38);
	border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Gold top like your header */
.auth-top {
	padding: 10px;
	background-image:
		linear-gradient(to bottom, rgba(255, 255, 255, 0.22), rgba(0, 0, 0, 0.08)),
		linear-gradient(to right, #e8c56a, #f1d07a, #e6bf5e, #d7ae48);
}

.auth-top-inner {
	border-radius: 18px;
	padding: 16px 16px 14px;
	background: rgba(255, 255, 255, 0.65);
	border: 1px solid rgba(0, 0, 0, 0.1);
}

/* pill tabs */
.auth-tabs {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
	background: rgba(0, 0, 0, 0.08);
	border-radius: 999px;
	padding: 6px;
}

.auth-tab {
	height: 38px;
	border-radius: 999px;
	font-weight: 800;
	font-size: 13px;
	letter-spacing: 0.2px;
	color: rgba(0, 0, 0, 0.65);
	transition:
		transform 0.08s ease,
		background-color 0.15s ease,
		color 0.15s ease;
}

.auth-tab:active {
	transform: translateY(1px);
}

.auth-tab.is-active {
	background: #000;
	color: rgb(252 211 77); /* amber-300 */
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
}

/* body */
.auth-body {
	padding: 16px 18px 18px;
}

.auth-label {
	display: block;
	font-size: 12px;
	font-weight: 700;
	color: rgba(0, 0, 0, 0.65);
	margin-bottom: 6px;
}

/* input polish */
.auth-input :deep(input) {
	border-radius: 14px;
	width: 100%;
}
.auth-input {
	width: 100%;
}

/* CTA */
.auth-cta {
	border-radius: 14px !important;
	color: #000 !important;
	font-weight: 900 !important;
	background-image: linear-gradient(to right, #fde68a, #fbbf24, #f59e0b);
	box-shadow: 0 16px 35px rgba(0, 0, 0, 0.22);
}

.auth-cta:hover {
	filter: brightness(0.98);
}

/* footer link */
.auth-footer {
	text-align: center;
	font-size: 12px;
	color: rgba(0, 0, 0, 0.55);
}

.auth-link {
	font-weight: 800;
	color: #000;
	margin-left: 6px;
	text-decoration: underline;
	text-underline-offset: 3px;
}

/* bottom black strip */
.auth-bottom {
	padding: 12px 16px;
	background: #000;
	text-align: center;
}
</style>
