pipeline {
  agent any

  environment {
    COMPOSE_FILE = 'docker-compose.dev.yml'
  }

  stages {
    stage('Install & Test') {
      steps {
        sh 'docker compose -f $COMPOSE_FILE up --build --abort-on-container-exit'
      }
    }

    stage('Clean Up') {
      steps {
        sh 'docker compose -f $COMPOSE_FILE down --volumes --remove-orphans'
      }
    }
  }

  post {
    success {
      echo '✅ All tests passed!'
    }
    failure {
      echo '❌ Tests failed.'
    }
  }
}
