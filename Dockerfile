FROM nginx:stable-alpine

# Copy built static site
COPY ./dist /usr/share/nginx/html

# Optional: expose port (container runtime can map to host)
EXPOSE 80

# Start nginx (default CMD)
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
