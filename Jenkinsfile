pipeline {
    agent any
    stages {
        stage('fetch'){
            steps{
                pwd()
                git branch: 'dev', url: 'https://github.com/Utopia-Airline/admin-portal.git'
            }
        }
        stage('build'){
            steps{
                sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 014285101692.dkr.ecr.us-east-1.amazonaws.com"
                sh "docker build -t adminportal ."
                sh "docker tag adminportal:latest 014285101692.dkr.ecr.us-east-1.amazonaws.com/adminportal:latest"
                sh "docker push 014285101692.dkr.ecr.us-east-1.amazonaws.com/adminportal:latest"
                sh "aws ecs update-service --cluster utopiaCluster --service admin-service --force-new-deployment"              
            }
        }
    }
}