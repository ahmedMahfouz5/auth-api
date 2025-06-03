pipeline {
  agent any

  environment {
    COMPOSE_FILE_TEST = 'docker-compose.dev.yml'
    COMPOSE_FILE_PROD = 'docker-compose.prod.yml'
  }

  stages {
    stage('Install & Test') {
      steps {
        sh 'docker compose -f $COMPOSE_FILE_TEST up --build --abort-on-container-exit'
      }
    }
    stage('deploy') {
      steps {
        sh 'docker compose -d -f $COMPOSE_FILE_PROD up --build'
      }
    }
  }

  post {
    success {
      echo '✅ All tests passed!'
    }
    failure {
      echo '❌ Tests failed.'
      sh 'docker compose -f $COMPOSE_FILE down --volumes --remove-orphans'
    }
  }
}
