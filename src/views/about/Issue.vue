<template>
  <v-container>
    <v-card-title>
      提交Issue
    </v-card-title>
    <v-row>
      <v-col cols="auto">
        <v-card>
          <v-card-subtitle class="font-weight-bold text-subtitle-1">
            关于本Issue助手页，您可能需要了解的事情：
          </v-card-subtitle>
          <v-card-text class="px-3 py-0">
            <v-list-item
              v-for="item in comments"
              :key="item"
              dense
              v-text="item"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card-text class="pa-0 ma-2">
          本次报告是关于
        </v-card-text>
        <v-btn-toggle
          v-model="purpose"
          tile
          group
          dense
          mandatory
          color="primary"
          class="d-flex flex-wrap"
        >
          <v-btn
            value="bug"
          >
            Bug / 故障
          </v-btn>
          <v-btn
            value="feature"
          >
            Feature / 功能需求
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-container
      v-if="purpose === 'bug'"
      fluid
      class="py-0"
    >
      <v-row no-gutters>
        <v-col class="col-12 col-lg-9">
          <v-text-field
            v-model="title"
            clearable
            label="故障标题"
            hint="简要概括故障性质和故障表现"
            :rules="rules"
          />
        </v-col>
        <v-col class="col-12 col-lg-3">
          <v-text-field
            v-model="commit"
            disabled
            label="当前版本"
          />
        </v-col>
      </v-row>
      <v-text-field
        v-model="bug.useragent[0]"
        disabled
        label="浏览器和操作系统信息"
      />
      <v-text-field
        v-model="bug.locate[0]"
        clearable
        label="故障发生的位置"
        hint="可以使用URL或者导航条里的组件名称"
        :rules="rules"
      />
      <v-textarea
        v-model="bug.steps[0]"
        clearable
        counter="200"
        label="故障重现的操作步骤"
        hint="简洁清晰的步骤有助于更快定位问题发生的原因"
        :rules="rules"
        @change="onTextUpdate(bug.steps[0])"
      />
      <v-row no-gutters>
        <v-col class="pa-0 ma-0 col-12 col-lg-6">
          <v-textarea
            v-model="bug.expects[0]"
            clearable
            counter="200"
            label="预期表现"
            hint="预期的结果需要唯一并且可以被度量，过于模糊的修辞无法作为衡量的标准"
            :rules="rules"
            @change="onTextUpdate(bug.expects[0])"
          />
        </v-col>
        <v-col class="pa-0 ma-0 col-12 col-lg-6">
          <v-textarea
            v-model="bug.facts[0]"
            clearable
            counter="200"
            label="实际表现"
            :rules="rules"
            @change="onTextUpdate(bug.facts[0])"
          />
        </v-col>
      </v-row>
      <v-textarea
        v-model="bug.others[0]"
        clearable
        counter="200"
        label="其他说明信息（可选）"
        hint="遇到该Bug的使用场景或必要上下文信息"
        @change="error = bug.others[0].length > 200 ? true : false"
      />
    </v-container>

    <v-container
      v-if="purpose === 'feature'"
      fluid
      class="py-0"
    >
      <v-row no-gutters>
        <v-col class="col-12 col-lg-9">
          <v-text-field
            v-model="title"
            clearable
            label="需求标题"
            hint="简要概括这个新功能或新需求"
            :rules="rules"
          />
        </v-col>
        <v-col class="col-12 col-lg-3">
          <v-text-field
            v-model="commit"
            disabled
            label="当前版本"
          />
        </v-col>
      </v-row>
      <v-textarea
        v-model="feature.conditions[0]"
        clearable
        counter="200"
        label="在哪些情况下会使用到这个功能 / 这个功能解决了哪些问题"
        hint="请尽可能详细说明这个需求的应用场景，越明确且越常见的应用场景会让这个需求更容易被列入项目开发列表之中"
        :rules="rules"
        @change="onTextUpdate(feature.conditions[0])"
      />
      <v-textarea
        v-model="feature.description[0]"
        clearable
        counter="200"
        label="这个功能是怎样工作 / 呈现的"
        hint="请描述这个功能的使用方法"
        :rules="rules"
        @change="onTextUpdate(feature.description[0])"
      />
    </v-container>
    <v-row justify="center">
      <v-btn
        color="primary"
        @click="onPreview"
      >
        预览
      </v-btn>
    </v-row>
    <v-row
      v-if="checkflag || error"
      justify="center"
    >
      <v-chip
        outlined
        label
        small
        color="error"
        class="ma-5"
      >
        请正确填写必要内容
      </v-chip>
    </v-row>
    <v-dialog
      v-model="preview.bug"
      persistent
      :width="$store.state.mobile ? '400' : '800'"
    >
      <v-card
        class="d-flex flex-wrap"
      >
        <v-row no-gutters>
          <v-col
            cols="12"
            class="d-flex flex-row"
          >
            <v-chip 
              label
              outlined
              color="primary"
              class="mx-4 my-2"
            >
              故障标题
            </v-chip>
            <v-card-actions class="ml-auto">
              <v-btn
                color="blue darken-1"
                text
                @click="onPreviewClosed('bug')"
                v-text="`关闭`"
              />
            </v-card-actions>
          </v-col>
          <v-col cols="12">
            <v-card-text
              class="mx-6 my-2 pa-0 text-wrap"
              :style="style"
            >
              {{ title }}
            </v-card-text>
          </v-col>
          <v-col
            cols="12"
          >
            <v-chip 
              label
              outlined
              color="primary"
              class="mx-4 my-2"
              v-text="`当前版本`"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <v-card-text 
              class="mx-6 my-2 pa-0"
              :style="style"
              v-text="commit"
            />
          </v-col>
        </v-row>
        <v-row
          v-for="(value, key) in bug"
          :key="key"
          no-gutters
        >
          <v-col
            v-if="value[0]"
            cols="12"
          >
            <v-chip 
              label
              outlined
              color="primary"
              class="mx-4 my-2"
              v-text="value[1]"
            />
          </v-col>
          <v-col
            v-if="value[0]"
            cols="12"
          >
            <v-card-text 
              class="mx-6 my-2 pa-0 text-wrap"
              :style="style"
              v-html="mark(value[0])"
            />
          </v-col>
        </v-row>
        <v-col class="col-12 pa-0 ma-0" />
        <v-row
          no-gutters
          justify="center"
        >
          <v-card-actions>
            <v-btn
              :loading="submitting"
              :disabled="submitting"
              color="success"
              text
              @click="submit(bug)"
            >
              提交
            </v-btn>
            <v-chip
              v-if="result"
              outlined
              label
              :color="result === 'success' ? 'success' : 'error'"
            >
              <v-icon v-if="result === 'success'">
                mdi-check
              </v-icon>
              <v-icon v-if="result === 'error'">
                mdi-close
              </v-icon>
            </v-chip>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="preview.feature"
      persistent
      :width="$store.state.mobile ? '400' : '800'"
    >
      <v-card
        class="d-flex flex-wrap"
      >
        <v-row no-gutters>
          <v-col
            cols="12"
            class="d-flex flex-row"
          >
            <v-chip 
              label
              outlined
              color="primary"
              class="mx-4 my-2"
            >
              故障标题
            </v-chip>
            <v-card-actions class="ml-auto">
              <v-btn
                color="blue darken-1"
                text
                @click="onPreviewClosed('feature')"
                v-text="`关闭`"
              />
            </v-card-actions>
          </v-col>
          <v-col cols="12">
            <v-card-text
              class="mx-6 my-2 pa-0 text-wrap"
              :style="style"
            >
              {{ title }}
            </v-card-text>
          </v-col>
          <v-col
            cols="12"
          >
            <v-chip 
              label
              outlined
              color="primary"
              class="mx-4 my-2"
              v-text="`当前版本`"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <v-card-text 
              class="mx-6 my-2 pa-0"
              :style="style"
              v-text="commit"
            />
          </v-col>
        </v-row>
        <v-row
          v-for="(value, key) in feature"
          :key="key"
          no-gutters
        >
          <v-col
            v-if="value[0]"
            cols="12"
          >
            <v-chip 
              label
              outlined
              color="primary"
              class="mx-4 my-2"
              v-text="value[1]"
            />
          </v-col>
          <v-col
            v-if="value[0]"
            cols="12"
          >
            <v-card-text 
              class="mx-6 my-2 pa-0 text-wrap"
              :style="style"
              v-html="value[0]"
            />
          </v-col>
        </v-row>
        <v-row
          no-gutters
          justify="center"
        >
          <v-card-actions>
            <v-btn
              color="success"
              :loading="submitting"
              :disabled="submitting"
              text
              @click="submit(feature)"
            >
              提交
            </v-btn>
            <v-chip
              v-if="result"
              outlined
              label
              :color="result === 'success' ? 'success' : 'error'"
            >
              <v-icon v-if="result === 'success'">
                mdi-check
              </v-icon>
              <v-icon v-if="result === 'error'">
                mdi-close
              </v-icon>
            </v-chip>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import marked from 'marked'
import request from '@/util/request.js'

export default {
  name: 'Issue',
  data () {
    return {
      comments: [
        'Issue的列表是指导后续开发活动的一个重要组成，因此，这里只接受以下两种报告类型的提交。',
        '1）页面或组件的Bug；',
        '2）网站新功能的请求。',
        '如果您有关于使用方面的疑惑，请移步至论坛讨论帖或联系我们。',
        '开发小组会将符合规范的Issue设置为优先级更高的目标，请理解。',
        '多行的文本支持使用Markdown进行格式化。'
      ],
      rules: [
        value => !!value || '该项目为必填项',
        value => value.length <= 200 || '超过最大文字数'
      ],
      purpose: 'bug',
      title: '',
      commit: this.$store.state.gitcommit.toUpperCase(),
      bug: {
        useragent: [navigator.userAgent, '浏览器和操作系统信息'],
        locate: ['', '故障发生的位置'],
        steps: ['', '故障重现的操作步骤'],
        expects: ['', '预期表现'],
        facts: ['', '实际表现'],
        others: ['', '其他说明信息']
      },
      feature: {
        conditions: ['', '在哪些情况下会使用到这个功能 / 这个功能解决了哪些问题'],
        description: ['', '这个功能是怎样工作 / 呈现的']
      },
      preview: {
        bug: false,
        feature: false
      },
      checkflag: false,
      submitting: false,
      result: null,
      error: false
    }
  },
  computed: {
    style () {
      return this.$store.state.mobile ? 'width: 18rem;' : 'width: 40rem;'
    }
  },
  mounted () {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code, language) {
        const hljs = require('highlight.js')
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
        return hljs.highlight(validLanguage, code).value
      },
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })
  },
  methods: {
    mark (text) {
      return marked(text)
    },
    onPreview () {
      this.checkflag = false
      switch (this.purpose) {
        case 'bug':
          for (const key of Object.keys(this.bug)) {
            if ((!this.bug[key][0] || !this.title) && key !== 'others') {
              this.checkflag = true
              break
            }
          }
          this.preview.bug = this.checkflag || this.error ? false : true
          break
        case 'feature':
          for (const key of Object.keys(this.feature)) {
            if (!this.feature[key][0] || !this.title) {
              this.checkflag = true
              break
            }
          }
          this.preview.feature = this.checkflag || this.error ? false : true
          break
        default:
          break
      }
    },
    onPreviewClosed (val) {
      this.preview[val] = false
      this.result = null
    },
    onTextUpdate (text) {
      this.error = (!text || text.length > 200 ) ? true : false
    },
    submit (object) {
      const data = JSON.parse(JSON.stringify(object))
      Object.keys(data).forEach(x => {
        if (Object.prototype.toString.call(data[x]) == '[object Array]') {
          data[x] = data[x][0]
        }
      })
      data.title = this.title
      data.commit = this.commit
      this.submitting = true
      setTimeout(() => {
        request.PostNewIssue(data).then(() => {
          this.submitting = false
          this.result = 'success'
        }).catch(() => {
          this.submitting = false
          this.result = 'error'
        })
      }, 3000)
    }
  }
}
</script>
