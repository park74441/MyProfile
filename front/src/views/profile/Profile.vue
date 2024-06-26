<script setup>
import { onMounted, reactive, ref } from 'vue'
import { server } from '@/api/index.js'
import { useAuthStore } from '@/stores/auth.js'
import Router from '@/router/index.js'
import { $alert } from '@/ui/notify.js'
import { setModel } from '@/utils/core/dataUtils.js'

const auth = useAuthStore().user

const user = reactive({
    photo: '',
    image: [],
    name: '',
    alias: '',
    addr: '',
    addrDetail: '',
    gitHub: '',
    blog: '',
    email: '',
    simpleIntroduceMyself: '',
    detailIntroduceMyself: '',
    mainContent: [],
    mainContentFirst: '',
    mainContentSecond: '',
})

const userForm = reactive({ ...user })
const isEditing = ref(false)

const toggleEdit = () => {
    isEditing.value = !isEditing.value
}

const saveChanges = () => {
    server
        .put(`/api/name/${auth.alias}`, { params: userForm })
        .then(result => {
            if (result.data.result === 'success') {
                $alert('저장되었습니다.\r\n"www.devstat.app/test"에 접속해 확인해보세요!').then(() => {
                    Router.go(0)
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
    Object.assign(user, userForm)
    isEditing.value = false
}

const cancelEdit = () => {
    Object.assign(userForm, user)
    isEditing.value = false
}

const imageChage = () => {
    if (user.image.size > 10240000) {
        $alert('업로드 최대 사이즈는 10MB입니다.\r\n다른 이미지를 선택해주세요.')
    } else {
        server
            .put(
                `/api/name/${auth.alias}/profileImage`,
                { profileImage: user.image },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            .then(result => {
                if (result.data.image) {
                    userForm.photo = `/static/profile/${auth.alias}/${result.data.image}?v2`
                }
            })
            .catch(error => {
                $alert(error.message)
            })
    }
}

onMounted(() => {
    server.get(`/api/name/${auth.alias}`).then(result => {
        let authInfo = result.data.profile

        setModel(user, authInfo)

        user.photo = `/static/profile/${auth.alias}/${authInfo.image}`
        user.mainContentFirst = authInfo.mainContent?.split('||')[0]
        user.mainContentSecond = authInfo.mainContent?.split('||')[1]

        Object.assign(userForm, user)
    })
})
</script>
<template>
    <q-page class="q-pa-md">
        <q-card>
            <q-card-section>
                <div class="row items-center">
                    <q-avatar size="100px" class="q-mr-md">
                        <q-img loading-show-delay="1" :src="userForm.photo" />
                    </q-avatar>
                    <q-file type="file" v-if="isEditing" v-model="user.image" label="프로필 이미지" @update:model-value="imageChage" />
                </div>
            </q-card-section>
            <q-card-section>
                <q-list>
                    <q-item>
                        <q-item-section>
                            <q-item-label>이름</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.name }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.name" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>별명</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.alias }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.alias" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>주소</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.addr }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.addr" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>상세 주소</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.addrDetail }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.addrDetail" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>깃허브 주소</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.gitHub }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.gitHub" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>블로그 주소</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.blog }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.blog" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>이메일</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.email }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.email" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>메인페이지 첫째줄</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user?.mainContentFirst }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.mainContentFirst" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>메인페이지 둘째줄</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.mainContentSecond }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.mainContentSecond" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>한줄 소개</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.simpleIntroduceMyself }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.simpleIntroduceMyself" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>상세 소개</q-item-label>
                            <q-editor
                                height="300px"
                                v-if="!isEditing"
                                :content-style="{ fontSize: '1rem' }"
                                readonly
                                v-model="user.detailIntroduceMyself"
                                name="contents"
                                :dense="$q.screen.lt.md"
                                :toolbar="[]"
                            />
                            <q-editor
                                height="300px"
                                v-if="isEditing"
                                :content-style="{ fontSize: '1rem' }"
                                v-model="userForm.detailIntroduceMyself"
                                name="contents"
                                :dense="$q.screen.lt.md"
                                :toolbar="[]"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn v-if="!isEditing" color="primary" label="수정" @click="toggleEdit" />
                <q-btn v-if="isEditing" color="primary" label="저장" @click="saveChanges" />
                <q-btn v-if="isEditing" color="secondary" label="취소" @click="cancelEdit" />
            </q-card-actions>
        </q-card>
    </q-page>
</template>
<style scoped>
.q-card {
    margin: auto;
}
.q-item-section {
    display: flex;
    align-items: center;
}
.q-item-label {
    flex: 1;
}
.q-input {
    flex: 2;
}
</style>
