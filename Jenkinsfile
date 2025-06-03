```groovy
pipeline {
  agent any

  environment {
    COMPOSE_FILE_TEST = 'docker-compose.dev.yml'
    COMPOSE_FILE_PROD = 'docker-compose.prod.yml'
    EMAIL_RECIPIENTS = 'jimap84307@jeanssi.com'
  }

  stages {
    stage('Install & Test') {
      steps {
        sh 'docker compose -f $COMPOSE_FILE_TEST up --build --abort-on-container-exit'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker compose -f $COMPOSE_FILE_PROD up -d --build'
      }
    }

    stage('Email Notification') {
      steps {
        mail to: "$EMAIL_RECIPIENTS",
             subject: "Jenkins Job: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
             body: "The pipeline has finished. Check the build details at ${env.BUILD_URL}"
      }
    }
  }

  post {
    success {
      echo '✅ All tests passed!'
    }
    failure {
      echo '❌ Tests failed.'
      sh 'docker compose -f $COMPOSE_FILE_TEST down --volumes --remove-orphans'
      mail to: "$EMAIL_RECIPIENTS",
           subject: "Jenkins Job: ${env.JOB_NAME} #${env.BUILD_NUMBER} - FAILURE",
           body: "The pipeline failed. Check the build details at ${env.BUILD_URL}"
    }
  }
}
```
