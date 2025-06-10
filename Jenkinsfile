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
        echo '============================= start test ============================='
        sh 'docker compose -f $COMPOSE_FILE_TEST up --build --abort-on-container-exit'
      }
        post {
    success {
      echo 'All tests passed!'
      sh 'docker compose -f $COMPOSE_FILE_TEST down --volumes --remove-orphans'
    }
    failure {
      echo 'Tests failed.'
      sh 'docker compose -f $COMPOSE_FILE_TEST down --volumes --remove-orphans'
      mail to: "$EMAIL_RECIPIENTS",
           subject: "Jenkins Job: ${env.JOB_NAME} #${env.BUILD_NUMBER} - FAILURE",
           body: "The pipeline failed. Check the build details at ${env.BUILD_URL}"
    }
  }
    }

    stage('Deploy') {
      steps {
        echo '============================= start deploy ============================='
        sh 'docker compose -f $COMPOSE_FILE_PROD up -d --build'
      }
    }

    stage('Email Notification') {
      steps {
        echo '============================= start email notification ============================='
        mail to: "$EMAIL_RECIPIENTS",
             subject: "Jenkins Job: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
             body: "The pipeline has finished. Check the build details at ${env.BUILD_URL}"
      }
    }
  }


}