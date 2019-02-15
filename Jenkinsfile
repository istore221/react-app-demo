pipeline {
    agent any
    environment {
       IMAGE = 'istore221/athena-dashboard-ui'
       VERSION = sh(returnStdout: true, script: 'node -e \"console.log(require(\'./package.json\').version);\"')
    }
    parameters {
       string(name: 'NODE_ENV', defaultValue: 'development', description: '')
    }
    stages {
        stage('Run Docker Compose') {
            steps {
                sh "./startup.sh -e ${params.NODE_ENV}"
            }
        }
        stage('Remove Unused Images') {
            steps {
                sh 'docker rmi $(docker images -q -f dangling=true) --force || exit 0'
                sh 'docker rmi $(docker images | grep -w ${IMAGE} | tail -n +2 | awk "{print $3}") --force || exit 0'
            }
        }

    }
}
