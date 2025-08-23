# Étape 1 : Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copier uniquement les fichiers nécessaires au build
COPY package*.json ./
COPY prisma ./prisma/

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Générer le client Prisma + Build Next.js
RUN npx prisma generate
RUN npm run build

# Étape 2 : Runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copier les fichiers buildés
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Prisma client
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
