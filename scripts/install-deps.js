import { execSync } from 'child_process';
import { cwd } from 'process';

console.log('[v0] Starting npm install to regenerate lock file...');
console.log('[v0] Working directory:', cwd());

try {
  execSync('npm install', {
    cwd: '/vercel/share/v0-project',
    stdio: 'inherit'
  });
  console.log('[v0] Successfully regenerated package-lock.json');
} catch (error) {
  console.error('[v0] Error during npm install:', error.message);
  process.exit(1);
}
