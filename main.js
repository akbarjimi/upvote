const avatarComponent = {
    name: 'avatar',
    template: `
    <div>
      <figure class="media-left" @click="clicked(submission.id)">
        <img class="image is-64x64" v-bind:src="submission.submissionImage">
      </figure>
    </div>
    `,
    props: ['submission'],
    methods: {
        clicked(subId) {
            alert("Submission "+subId+" has been clicked.");
        }
    }
};

const contentComponent = {
    name: 'vueContent',
    template:
    `<div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>
              <a v-bind:href="submission.url" class="has-text-info">
                {{ submission.title }}
              </a>
              <span class="tag is-small">#{{ submission.id }}</span>
            </strong>
            <br>
              {{ submission.description }}
            </br>
            <small class="is-size-7">
              Submitted by:
              <img class="image is-24x24" v-bind:src="submission.avatar">
            </small>
          </p>
        </div>
      </div>

</div>`,
    props: ['submission'],
};

const voteComponent = {
    name: 'vote',
    template:
    `      <div class="media-right">
      <span class="icon is-4" v-on:click="upvote(submission.id)">
        <i class="fa fa-chevron-up"></i>
        <strong class="has-text-info">{{ submission.votes }}</strong>
      </span>
      <span class="icon is-4" v-on:click="downvote(submission.id)">
        <i class="fa fa-chevron-down"></i>
      </span>
      </div>
`,
    props: ['submission','submissions',],
    methods: {
        upvote(submissionId) {
            const submission = this.submissions.find(
                submission => submission.id === submissionId
            );
            submission.votes++;
        },
        downvote(submissionId) {
            const submission = this.submissions.find(
                submission => submission.id === submissionId
            );

            submission.votes = Math.max(0, --submission.votes);
        }
    },
};

const submissionComponent = {
    name: 'submission',
    template:
        `<div style="display: flex; width: 100%">
            <avatar-component v-bind:submission="submission"></avatar-component>
            <content-component v-bind:submission="submission"></content-component>
            <vote-component :submission="submission" :submissions="submissions"></vote-component>
        </div>`,
    props: ['submission', 'submissions'],
    components: {
        'avatar-component': avatarComponent,
        'content-component': contentComponent,
        'vote-component': voteComponent,
    }
};

new Vue({
    el: "#app",
    data: {
        submissions: submissions
    },
    computed: {
        sortedSubmissions() {
            return this.submissions.sort((a, b) => {
                return b.votes - a.votes
            });
        }
    },
    components: {
        'avatar-component': avatarComponent,
        'content-component': contentComponent,
        'vote-component': voteComponent,
        'submission-component': submissionComponent
    }
});
