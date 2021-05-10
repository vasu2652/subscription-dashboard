FROM node:12.6.0-buster-slim
RUN mkdir /apollo-subscriptions-dashboard-service && npm install pm2 -g && chown -R node:node /apollo-subscriptions-dashboard-service
WORKDIR /apollo-subscriptions-dashboard-service
EXPOSE 3005
COPY --chown=node:node ./ /apollo-subscriptions-dashboard-service
USER node
RUN npm install \
    && npm run build
    
CMD ["pm2-runtime", "pm2.json"]
