pipeline {
    agent {
			node {
				label 'jenkins-custom-agent'
			}
		}
    environment {
        DOCKER_REGISTRY_USER = 'atticuswong174'
        IMAGE_NAME = 'r-a8n-frontend' // or 'my-nextjs-frontend'
        REGISTRY_CRED_ID = 'docker-hub-login' 
        // For Next.js, add:
        // NEXT_PUBLIC_API_URL = "https://api.yourdomain.com"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Image') {
            steps {
                script {
                    // For Next.js, we pass the build-arg
                    def buildArgs = (IMAGE_NAME.contains("frontend")) ? 
                        "--build-arg NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" : ""
                    
                    sh "docker build ${buildArgs} -t ${DOCKER_REGISTRY_USER}/${IMAGE_NAME}:${BUILD_NUMBER} ."
                    sh "docker tag ${DOCKER_REGISTRY_USER}/${IMAGE_NAME}:${BUILD_NUMBER} ${DOCKER_REGISTRY_USER}/${IMAGE_NAME}:latest"
                }
            }
        }
        stage('Push to Registry') {
            steps {
                withCredentials([usernamePassword(credentialsId: REGISTRY_CRED_ID, passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                    sh "docker push ${DOCKER_REGISTRY_USER}/${IMAGE_NAME}:${BUILD_NUMBER}"
                    sh "docker push ${DOCKER_REGISTRY_USER}/${IMAGE_NAME}:latest"
                }
            }
        }
        stage('Deploy') {
            steps {
                // If deploying to a remote server via SSH
                sshagent(['server-ssh-key']) {
                    sh "ssh ${R_A8N_USER}@${R_A8N_SERVER_IP}'docker compose pull && docker compose up -d'}"
                }
            }
        }
    }
}
