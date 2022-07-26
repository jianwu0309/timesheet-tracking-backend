import * as convict from 'convict';

export interface IConfig {
  env: string;
  server: {
    port: number;
    frontendURL: string;
    passwordSalt: string;
    tokenExpiry: string;
    tokenSecret: string;
    resetHashExpiry: number;
    accessKey: string;
  };
  api: {
    baseURL: string;
  };
  apiDocs: {
    username: string;
    password: string;
  };
  database: {
    connectionName: string;
    databaseType: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    driverExtra: Object;
    cacheDuration: number;
    maxQueryExecutionTime: number;
    readReplicationSlaves: string;
  };
  email: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    password: string;
    contactEmail: string;
    bccEmails: string;
    listingDays: string;
  };
}

const config = convict<IConfig>({
  env: {
    format: ['local', 'production', 'development'],
    env: 'NODE_ENV',
    arg: 'node-env',
    default: 'local',
  },
  server: {
    port: {
      format: 'port',
      env: 'PORT',
      default: 3000,
    },
    frontendURL: {
      format: String,
      env: 'FRONTEND_URL',
      default: 'http://localhost:4200'
    },
    passwordSalt: {
      format: String,
      env: 'HASH_SALT',
      default: 'timesheet@123'
    },
    tokenExpiry: {
      format: String,
      env: 'TOKEN_EXPIRY',
      default: '1d'
    },
    tokenSecret: {
      format: String,
      env: 'TOKEN_SECRET',
      default: ''
    },
    resetHashExpiry: {
      format: Number,
      env: 'RESET_HASH_EXPIRY',
      default: 4
    },
    accessKey: {
      format: String,
      env: 'ACCESS_KEY',
      default: ''
    }
  },
  api: {
    baseURL: {
      format: String,
      env: 'API_BASEURL',
      default: '/api/v1',
    },
  },
  apiDocs: {
    username: {
      format: String,
      env: 'API_DOC_USERNAME',
      default: 'vanapp',
    },
    password: {
      format: String,
      env: 'API_DOC_PASSWORD',
      default: 'vanapp123',
    },
  },
  database: {
    connectionName: {
      format: String,
      env: 'CONN_NAME',
      default: 'default',
    },
    databaseType: {
      format: String,
      env: 'TYPEORM_CONNECTION',
      default: '',
    },
    host: {
      format: String,
      env: 'TYPEORM_HOST',
      default: '',
    },
    port: {
      format: 'port',
      env: 'TYPEORM_PORT',
      default: 0,
    },
    username: {
      format: String,
      env: 'TYPEORM_USERNAME',
      default: '',
    },
    password: {
      format: String,
      env: 'TYPEORM_PASSWORD',
      default: '',
    },
    database: {
      format: String,
      env: 'TYPEORM_DATABASE',
      default: '',
    },
    driverExtra: {
      format: Object,
      env: 'TYPEORM_DRIVER_EXTRA',
      default: {},
    },
    cacheDuration: {
      format: Number,
      env: 'TYPEORM_CACHE_DURATION',
      default: 360000, // 1 hour
    },
    maxQueryExecutionTime: {
      format: Number,
      env: 'TYPEORM_MAX_QUERY_EXECUTION_TIME',
      default: 300,
    },
    readReplicationSlaves: {
      format: String,
      env: 'TYPEORM_READ_REPLICATION_SLAVES', // comma separated hostnames of read relication slaves
      default: '',
    },
  },
  email: {
    host: {
      format: String,
      env: 'SMTP_HOST',
      default: ''
    },
    port: {
      format: Number,
      env: 'SMTP_PORT',
      default: 465
    },
    secure: {
      format: Boolean,
      env: 'SMTP_SECURE',
      default: true
    },
    user: {
      format: String,
      env: 'SMTP_USER',
      default: ''
    },
    password: {
      format: String,
      env: 'SMTP_PASSWORD',
      default: ''
    },
    contactEmail: {
      format: String,
      env: 'CONTACT_EMAIL',
      default: 'contact@zerobenchtime.com'
    },
    bccEmails: {
      format: String,
      env: 'BCC_EMAIL',
      default: 'mok.developer@gmail.com'
    },
    listingDays: {
      format: String,
      env: 'LISTING_DAYS',
      default: 'Monday,Wednesday,Friday'
    }
  },
});

config.validate({ allowed: 'strict' });

export default config.getProperties();
