---
title: "Presto 完整指南：分布式 SQL 查询引擎"
date: 2025-09-30T06:00:00+08:00
categories:
  - 工具
tags:
  - 工具
  - 开源
toc: true
toc_label: "目录"
toc_icon: "cog"
mermaid: true
---

# Presto 完整指南：分布式 SQL 查询引擎

## 项目概述

[Presto](https://github.com/prestodb/presto) 是由 Facebook（现 Meta）开发的分布式 SQL 查询引擎，专为对大规模数据集进行交互式分析查询而设计。Presto 可以在各种数据源（包括 Hadoop、关系型数据库、NoSQL 数据库等）上执行 SQL 查询，提供低延迟和高吞吐量的查询能力。Presto 采用 MPP（大规模并行处理）架构，是数据仓库和分析工作负载的理想选择。

<div style="text-align: center; margin: 20px 0;">
  <svg width="600" height="300" xmlns="http://www.w3.org/2000/svg">
    <style>
      .title { font-family: Arial; font-size: 24px; font-weight: bold; fill: #2C3E50; text-anchor: middle; }
      .subtitle { font-family: Arial; font-size: 16px; fill: #7F8C8D; text-anchor: middle; }
      .logo { font-family: Arial; font-size: 36px; font-weight: bold; fill: #FF6B6B; text-anchor: middle; }
      .highlight { fill: #4ECDC4; }
      .badge { font-family: Arial; font-size: 12px; fill: #FFFFFF; font-weight: bold; text-anchor: middle; }
      .feature { font-family: Arial; font-size: 14px; fill: #2C3E50; }
    </style>
    <rect width="600" height="300" fill="#ECF0F1" rx="12" ry="12" stroke="#BDC3C7" stroke-width="2"/>
    <text x="300" y="60" class="logo">Presto</text>
    <text x="300" y="90" class="title">分布式 SQL 查询引擎</text>
    <text x="300" y="115" class="subtitle">高性能交互式分析查询</text>
    
    <!-- GitHub Stats -->
    <rect x="50" y="140" width="80" height="25" fill="#2ECC71" rx="12" ry="12"/>
    <text x="90" y="157" class="badge">15.2k ⭐</text>
    
    <rect x="150" y="140" width="80" height="25" fill="#3498DB" rx="12" ry="12"/>
    <text x="190" y="157" class="badge">5.1k Forks</text>
    
    <rect x="250" y="140" width="100" height="25" fill="#E74C3C" rx="12" ry="12"/>
    <text x="300" y="157" class="badge">Apache-2.0</text>
    
    <!-- Key Features -->
    <text x="50" y="200" class="feature">🚀 高性能</text>
    <text x="200" y="200" class="feature">🔌 多数据源</text>
    <text x="350" y="200" class="feature">⚡ 低延迟</text>
    <text x="500" y="200" class="feature">🌐 分布式</text>
    
    <text x="50" y="230" class="feature">📊 SQL 标准</text>
    <text x="200" y="230" class="feature">🔄 实时查询</text>
    <text x="350" y="230" class="feature">🎯 可扩展</text>
    <text x="500" y="230" class="feature">🛠️ 企业级</text>
    
    <text x="300" y="270" class="subtitle">官网: prestodb.io</text>
  </svg>
</div>

## 核心特性

Presto 提供了全面的分布式查询解决方案，具有以下核心特性：

- **🚀 高性能查询**：采用 MPP 架构，支持并行处理，提供高吞吐量查询
- **🔌 多数据源支持**：支持 Hive、MySQL、PostgreSQL、Kafka、Elasticsearch、MongoDB 等多种数据源
- **⚡ 低延迟交互**：专为交互式分析查询设计，提供秒级响应
- **📊 SQL 标准兼容**：支持 ANSI SQL 标准，易于使用和学习
- **🌐 分布式架构**：Coordinator-Worker 架构，支持水平扩展
- **🔄 实时查询**：支持对多个数据源进行实时查询，无需数据迁移
- **🎯 可扩展性**：插件化连接器架构，易于扩展新的数据源
- **🛠️ 企业级功能**：支持安全认证、资源管理、监控等企业级功能

## 系统架构

Presto 采用 Coordinator-Worker 架构，由一个 Coordinator 节点和多个 Worker 节点组成。

```mermaid
graph TB
    subgraph "客户端层"
        A[CLI 客户端]
        B[JDBC 客户端]
        C[REST API]
        D[其他客户端]
    end
    
    subgraph "Coordinator 节点"
        E[SQL 解析器]
        F[查询计划器]
        G[查询调度器]
        H[元数据管理]
        I[资源管理器]
    end
    
    subgraph "Worker 节点集群"
        J[Worker 1<br/>任务执行]
        K[Worker 2<br/>任务执行]
        L[Worker N<br/>任务执行]
    end
    
    subgraph "数据源层"
        M[Hive/HDFS]
        N[MySQL]
        O[PostgreSQL]
        P[Kafka]
        Q[Elasticsearch]
        R[其他数据源]
    end
    
    A --> E
    B --> E
    C --> E
    D --> E
    
    E --> F
    F --> G
    G --> H
    G --> I
    
    G --> J
    G --> K
    G --> L
    
    J --> M
    J --> N
    K --> O
    K --> P
    L --> Q
    L --> R
    
    J --> G
    K --> G
    L --> G
    
    G --> A
    G --> B
    G --> C
```

## 查询处理流程

Presto 的查询处理流程包括 SQL 解析、查询规划、任务调度和执行等步骤。

```mermaid
sequenceDiagram
    participant Client as 客户端
    participant Parser as SQL 解析器
    participant Analyzer as 语义分析器
    participant Planner as 查询计划器
    participant Scheduler as 查询调度器
    participant Worker as Worker 节点
    participant Connector as 连接器
    
    Client->>Parser: 提交 SQL 查询
    Parser->>Parser: 解析 SQL 语句
    Parser->>Analyzer: 生成 AST
    Analyzer->>Analyzer: 语义分析
    Analyzer->>Analyzer: 类型检查
    Analyzer->>Planner: 生成逻辑计划
    Planner->>Planner: 优化查询计划
    Planner->>Planner: 生成物理计划
    Planner->>Scheduler: 提交查询计划
    Scheduler->>Worker: 分配任务
    Worker->>Connector: 读取数据
    Connector-->>Worker: 返回数据
    Worker->>Worker: 处理数据
    Worker-->>Scheduler: 返回结果
    Scheduler-->>Planner: 聚合结果
    Planner-->>Client: 返回最终结果
```

## 安装与部署

### 系统要求

- **Java 版本**：Java 8 或更高版本（推荐 Java 11+）
- **操作系统**：Linux、macOS 或 Windows
- **内存**：建议至少 8GB RAM（根据工作负载调整）
- **磁盘**：建议至少 10GB 可用空间

### 下载 Presto

从 [Presto 官方仓库](https://github.com/prestodb/presto) 下载最新版本：

```bash
# 下载 Presto Server
wget https://repo1.maven.org/maven2/com/facebook/presto/presto-server/0.276/presto-server-0.276.tar.gz

# 解压
tar -xzf presto-server-0.276.tar.gz
cd presto-server-0.276
```

### 目录结构

```
presto-server-0.276/
├── bin/              # 启动脚本
├── lib/              # Presto 核心库
├── plugin/           # 连接器插件
├── etc/              # 配置文件目录
│   ├── config.properties
│   ├── node.properties
│   ├── jvm.config
│   └── catalog/      # 数据源配置
└── var/              # 数据目录
    ├── log/          # 日志文件
    └── data/         # 数据文件
```

### 配置 Coordinator

创建 `etc/config.properties`：

```properties
coordinator=true
node-scheduler.include-coordinator=true
http-server.http.port=8080
query.max-memory=50GB
query.max-memory-per-node=10GB
query.max-total-memory=100GB
discovery-server.enabled=true
discovery.uri=http://localhost:8080
```

### 配置 Worker

创建 `etc/config.properties`：

```properties
coordinator=false
http-server.http.port=8080
query.max-memory=50GB
query.max-memory-per-node=10GB
query.max-total-memory=100GB
discovery.uri=http://coordinator.example.com:8080
```

### JVM 配置

创建 `etc/jvm.config`：

```properties
-server
-Xmx16G
-XX:+UseG1GC
-XX:G1HeapRegionSize=32M
-XX:+UseGCOverheadLimit
-XX:+ExplicitGCInvokesConcurrent
-XX:+HeapDumpOnOutOfMemoryError
-XX:OnOutOfMemoryError=kill -9 %p
-XX:ReservedCodeCacheSize=512M
-Djdk.attach.allowAttachSelf=true
-Djdk.nio.maxCachedBufferSize=2000000
```

### 节点配置

创建 `etc/node.properties`：

```properties
node.environment=production
node.id=ffffffff-ffff-ffff-ffff-ffffffffffff
node.data-dir=/var/presto/data
```

### 启动 Presto

```bash
# 启动 Presto Server
bin/launcher start

# 检查状态
bin/launcher status

# 停止 Presto Server
bin/launcher stop

# 重启
bin/launcher restart
```

### 验证安装

访问 Web UI：`http://localhost:8080`

## 连接器配置

Presto 使用连接器（Connector）访问不同的数据源。连接器在 `etc/catalog/` 目录下配置。

### Hive 连接器

创建 `etc/catalog/hive.properties`：

```properties
connector.name=hive-hadoop2
hive.metastore.uri=thrift://localhost:9083
hive.config.resources=/etc/hadoop/conf/core-site.xml,/etc/hadoop/conf/hdfs-site.xml
hive.storage-format=PARQUET
hive.compression-codec=SNAPPY
```

### MySQL 连接器

创建 `etc/catalog/mysql.properties`：

```properties
connector.name=mysql
connection-url=jdbc:mysql://mysql.example.com:3306
connection-user=root
connection-password=secret
```

### PostgreSQL 连接器

创建 `etc/catalog/postgresql.properties`：

```properties
connector.name=postgresql
connection-url=jdbc:postgresql://postgres.example.com:5432/database
connection-user=postgres
connection-password=secret
```

### Kafka 连接器

创建 `etc/catalog/kafka.properties`：

```properties
connector.name=kafka
kafka.table-names=orders,users,events
kafka.nodes=localhost:9092
```

### Elasticsearch 连接器

创建 `etc/catalog/elasticsearch.properties`：

```properties
connector.name=elasticsearch
elasticsearch.host=localhost
elasticsearch.port=9200
```

## 基本使用

### Presto CLI

安装 Presto CLI：

```bash
wget https://repo1.maven.org/maven2/com/facebook/presto/presto-cli/0.276/presto-cli-0.276-executable.jar
mv presto-cli-0.276-executable.jar presto
chmod +x presto
```

连接到 Presto：

```bash
./presto --server localhost:8080 --catalog hive --schema default
```

### 基本查询示例

```sql
-- 查询表数据
SELECT * FROM hive.default.orders LIMIT 10;

-- 聚合查询
SELECT 
    date_trunc('day', order_date) as day,
    count(*) as order_count,
    sum(total_amount) as total_revenue
FROM hive.default.orders
WHERE order_date >= DATE '2025-01-01'
GROUP BY date_trunc('day', order_date)
ORDER BY day;

-- JOIN 查询
SELECT 
    o.order_id,
    o.order_date,
    o.total_amount,
    c.customer_name,
    c.email
FROM hive.default.orders o
JOIN mysql.customers.customers c 
    ON o.customer_id = c.customer_id
WHERE o.order_date >= DATE '2025-01-01';

-- 跨数据源查询
SELECT 
    u.user_id,
    u.user_name,
    o.order_count,
    e.event_count
FROM mysql.users.users u
LEFT JOIN (
    SELECT customer_id, count(*) as order_count
    FROM hive.default.orders
    GROUP BY customer_id
) o ON u.user_id = o.customer_id
LEFT JOIN (
    SELECT user_id, count(*) as event_count
    FROM elasticsearch.events.events
    GROUP BY user_id
) e ON u.user_id = e.user_id;
```

## 高级功能

### 表分区

Presto 支持多种分区类型：

```sql
-- 创建分区表
CREATE TABLE hive.default.sales (
    sale_id BIGINT,
    sale_date DATE,
    product_id BIGINT,
    amount DECIMAL(10,2)
) WITH (
    partitioned_by = ARRAY['sale_date'],
    format = 'PARQUET'
);

-- 查询分区表
SELECT * FROM hive.default.sales 
WHERE sale_date = DATE '2025-01-01';
```

### 窗口函数

```sql
SELECT 
    product_id,
    sale_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY product_id 
        ORDER BY sale_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as rolling_7day_sum,
    RANK() OVER (
        PARTITION BY sale_date 
        ORDER BY amount DESC
    ) as daily_rank
FROM hive.default.sales
ORDER BY sale_date, daily_rank;
```

### 数组和 MAP 函数

```sql
-- 数组操作
SELECT 
    array[1, 2, 3] as arr,
    array_agg(product_id) as product_ids,
    array_contains(array[1, 2, 3], 2) as contains_2;

-- MAP 操作
SELECT 
    map(array['a', 'b'], array[1, 2]) as my_map,
    map_keys(my_map) as keys,
    map_values(my_map) as values;
```

### JSON 函数

```sql
SELECT 
    json_extract_scalar(data, '$.name') as name,
    json_extract(data, '$.items') as items,
    json_parse(data) as parsed_json
FROM (
    SELECT '{"name": "John", "items": [1, 2, 3]}' as data
);
```

### 用户定义函数 (UDF)

```sql
-- 注册 UDF
CREATE FUNCTION multiply(a INT, b INT)
RETURNS INT
LANGUAGE SQL
DETERMINISTIC
RETURN a * b;

-- 使用 UDF
SELECT multiply(5, 3) as result;
```

## 性能优化

### 查询优化策略

```mermaid
graph TD
    A[查询优化] --> B[分区剪枝]
    A --> C[谓词下推]
    A --> D[列剪枝]
    A --> E[统计信息]
    A --> F[并行执行]
    
    B --> B1[使用分区列过滤]
    C --> C1[在数据源端过滤]
    D --> D1[只读取需要的列]
    E --> E1[收集表和列统计]
    F --> F1[增加 Worker 节点]
```

### 分区剪枝

```sql
-- 好的查询：使用分区列过滤
SELECT * FROM hive.default.sales 
WHERE sale_date >= DATE '2025-01-01' 
  AND sale_date < DATE '2025-02-01';

-- 避免：全表扫描
SELECT * FROM hive.default.sales 
WHERE amount > 1000;
```

### 列剪枝

```sql
-- 好的查询：只选择需要的列
SELECT customer_id, order_date, total_amount 
FROM hive.default.orders;

-- 避免：SELECT *
SELECT * FROM hive.default.orders;
```

### 索引利用

对于关系型数据库连接器（MySQL、PostgreSQL），Presto 可以利用数据库索引：

```sql
-- 确保 WHERE 条件使用索引列
SELECT * FROM mysql.orders.orders 
WHERE order_id = 12345;  -- 假设 order_id 有索引
```

### 内存优化

调整 JVM 配置和查询内存限制：

```properties
# config.properties
query.max-memory=50GB
query.max-memory-per-node=10GB
query.max-total-memory=100GB

# jvm.config
-Xmx16G
-XX:+UseG1GC
```

### 并行度调整

```properties
# config.properties
task.concurrency=4
task.max-worker-threads=16
```

## 资源管理

Presto 支持资源组管理，用于限制查询资源使用。

```mermaid
graph TD
    A[资源管理器] --> B[资源组配置]
    B --> C[查询队列]
    C --> D[优先级调度]
    D --> E[内存限制]
    D --> F[并发限制]
    D --> G[CPU 限制]
```

### 资源组配置

创建 `etc/resource-groups.json`：

```json
{
  "rootGroups": [
    {
      "name": "global",
      "softMemoryLimit": "80%",
      "maxQueued": 1000,
      "hardConcurrencyLimit": 100,
      "subGroups": [
        {
          "name": "data_team",
          "softMemoryLimit": "50%",
          "maxQueued": 100,
          "hardConcurrencyLimit": 20,
          "schedulingPolicy": "weighted",
          "schedulingWeight": 10
        },
        {
          "name": "analytics_team",
          "softMemoryLimit": "30%",
          "maxQueued": 50,
          "hardConcurrencyLimit": 10,
          "schedulingPolicy": "weighted",
          "schedulingWeight": 5
        }
      ]
    }
  ]
}
```

### 查询优先级

```sql
-- 设置查询优先级
SET SESSION query_priority = 'high';

-- 运行查询
SELECT * FROM hive.default.large_table;
```

## 监控与管理

### Web UI

访问 `http://localhost:8080` 查看：

- 当前运行的查询
- 查询历史
- 集群状态
- Worker 节点信息
- 连接器状态

### 系统表查询

```sql
-- 查看运行中的查询
SELECT * FROM system.runtime.queries;

-- 查看查询统计
SELECT 
    query_id,
    state,
    user,
    elapsed_time,
    cpu_time,
    total_bytes,
    peak_memory_reservation
FROM system.runtime.queries
WHERE state = 'RUNNING';

-- 查看任务信息
SELECT * FROM system.runtime.tasks;

-- 查看节点信息
SELECT * FROM system.runtime.nodes;
```

### JMX 监控

```sql
-- 查看 JMX 指标
SELECT * FROM system.jmx."java.lang:type=Memory";
SELECT * FROM system.jmx."java.lang:type=GarbageCollector,name=*";
```

### 日志分析

```bash
# 查看日志
tail -f var/log/server.log
tail -f var/log/http-request.log

# 搜索错误
grep ERROR var/log/server.log
```

## 安全配置

### 身份验证

#### LDAP 认证

创建 `etc/password-authenticator.properties`：

```properties
password-authenticator.name=ldap
ldap.url=ldap://ldap.example.com:389
ldap.user-bind-pattern=uid=${USER},ou=People,dc=example,dc=com
```

#### Kerberos 认证

在 `etc/config.properties` 中添加：

```properties
http-server.authentication.type=KERBEROS
http-server.authentication.krb5.service-name=HTTP
http-server.authentication.krb5.principal-hostname=presto.example.com
http-server.authentication.krb5.keytab=/etc/presto/presto.keytab
```

### 授权

#### 文件授权

创建 `etc/access-control.properties`：

```properties
access-control.name=file
security.config-file=etc/security.json
```

创建 `etc/security.json`：

```json
{
  "catalogs": {
    "hive": {
      "allow": ["user1", "user2"],
      "deny": ["user3"]
    }
  },
  "schemas": {
    "hive.default": {
      "allow": ["user1"]
    }
  },
  "tables": {
    "hive.default.orders": {
      "owner": "user1",
      "grants": [
        {"principal": "user2", "privileges": ["SELECT"]},
        {"principal": "user3", "privileges": ["SELECT", "INSERT"]}
      ]
    }
  }
}
```

### HTTPS 配置

```properties
# config.properties
http-server.http.enabled=false
http-server.https.enabled=true
http-server.https.port=8443
http-server.https.keystore.path=/etc/presto/keystore.jks
http-server.https.keystore.key=keystore_password
```

## 故障排除

### 常见问题

#### 查询失败：内存不足

```
Error: Query exceeded max memory size of 50GB
```

**解决方案**：
1. 增加查询内存限制
2. 优化查询（减少数据扫描）
3. 使用 `LIMIT` 限制结果集

#### Worker 节点无法连接 Coordinator

```
Error: Could not connect to discovery server
```

**解决方案**：
1. 检查网络连接
2. 验证 `discovery.uri` 配置
3. 检查防火墙设置

#### 查询性能慢

**优化建议**：
1. 检查是否有分区剪枝
2. 验证连接器配置是否正确
3. 增加 Worker 节点
4. 检查数据源性能

### 诊断工具

```sql
-- 查看查询执行计划
EXPLAIN SELECT * FROM hive.default.orders;

-- 查看详细执行计划
EXPLAIN (FORMAT GRAPHVIZ) 
SELECT * FROM hive.default.orders 
WHERE order_date >= DATE '2025-01-01';
```

```mermaid
graph TD
    A[查询性能问题] --> B{检查查询计划}
    B --> C[分区剪枝]
    B --> D[谓词下推]
    B --> E[连接顺序]
    A --> F{检查资源}
    F --> G[内存使用]
    F --> H[CPU 使用]
    F --> I[网络带宽]
    A --> J{检查数据源}
    J --> K[数据源性能]
    J --> L[网络延迟]
    J --> M[连接器配置]
```

## 最佳实践

### 查询优化

1. **使用分区过滤**：始终在 WHERE 子句中使用分区列
2. **避免 SELECT \***：只选择需要的列
3. **使用 LIMIT**：测试查询时使用 LIMIT 限制结果
4. **优化 JOIN**：将小表放在右侧，使用合适的 JOIN 类型
5. **利用统计信息**：确保表和列有最新的统计信息

### 架构设计

```mermaid
graph TB
    A[最佳实践] --> B[集群设计]
    A --> C[数据组织]
    A --> D[查询模式]
    
    B --> B1[Coordinator 独立部署]
    B --> B2[Worker 节点规模]
    B --> B3[网络配置]
    
    C --> C1[数据分区]
    C --> C2[文件格式]
    C --> C3[压缩算法]
    
    D --> D1[查询缓存]
    D --> D2[结果缓存]
    D --> D3[连接池]
```

### 集群规划

1. **Coordinator 节点**：
   - 独立部署，不与 Worker 混合
   - 配置较高的内存和 CPU
   - 配置足够的网络带宽

2. **Worker 节点**：
   - 根据数据量和工作负载确定数量
   - 每个 Worker 配置 8-16GB 内存
   - 使用 SSD 提高 I/O 性能

3. **网络配置**：
   - 确保 Coordinator 和 Worker 之间低延迟
   - 使用千兆或万兆网络
   - 配置适当的超时设置

### 数据组织

1. **分区策略**：
   - 使用日期分区（按天、周、月）
   - 避免过度分区
   - 分区大小建议 1-10GB

2. **文件格式**：
   - 使用 Parquet 或 ORC 格式
   - 启用列压缩（SNAPPY、ZSTD）
   - 配置合适的行组大小

3. **存储优化**：
   - 使用 HDFS 或对象存储（S3）
   - 配置数据副本数
   - 定期清理旧数据

## 生态系统集成

### BI 工具集成

```mermaid
graph LR
    A[Presto] --> B[Tableau]
    A --> C[Superset]
    A --> D[Metabase]
    A --> E[Power BI]
    A --> F[Grafana]
```

#### Tableau 连接

1. 下载 Presto JDBC 驱动
2. 在 Tableau 中选择 "Other Databases (JDBC)"
3. 输入连接信息：
   - JDBC URL: `jdbc:presto://localhost:8080/hive/default`
   - 用户名和密码

#### Superset 连接

在 Superset 中添加数据库连接：

```
SQLAlchemy URI: presto://user:password@localhost:8080/hive
```

### 编程语言集成

#### Python

```python
from presto.dbapi import connect

conn = connect(
    host='localhost',
    port=8080,
    user='admin',
    catalog='hive',
    schema='default'
)
cur = conn.cursor()
cur.execute('SELECT * FROM orders LIMIT 10')
rows = cur.fetchall()
for row in rows:
    print(row)
```

#### Java

```java
import com.facebook.presto.jdbc.PrestoConnection;
import java.sql.*;

String url = "jdbc:presto://localhost:8080/hive/default";
Connection conn = DriverManager.getConnection(url, "user", null);
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT * FROM orders LIMIT 10");
while (rs.next()) {
    System.out.println(rs.getString("order_id"));
}
```

#### Node.js

```javascript
const presto = require('presto-client');

const client = new presto.Client({
  host: 'localhost',
  port: 8080,
  user: 'admin',
  catalog: 'hive',
  schema: 'default'
});

client.execute('SELECT * FROM orders LIMIT 10', (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result);
});
```

## 版本演进

Presto 的主要版本演进：

```mermaid
timeline
    title Presto 版本演进
    2012 : 初始版本发布
    2013 : Facebook 开源
    2018 : PrestoDB 和 Trino 分叉
    2019 : Presto 0.220+ 版本
    2020 : 支持 Iceberg 表格式
    2021 : 性能优化和连接器增强
    2022 : 支持 Delta Lake
    2023 : 本地执行引擎优化
    2024 : 最新版本 0.290+
```

## 与其他工具对比

### Presto vs. Apache Spark

| 特性 | Presto | Apache Spark |
|------|--------|--------------|
| 查询类型 | 交互式 SQL 查询 | 批处理和流处理 |
| 延迟 | 秒级 | 分钟级（批处理） |
| 数据源 | 多种数据源 | 主要 HDFS/S3 |
| 内存使用 | 中等 | 高 |
| 适用场景 | 即席查询、BI | ETL、机器学习 |

### Presto vs. Apache Hive

| 特性 | Presto | Apache Hive |
|------|--------|-------------|
| 执行引擎 | MPP | MapReduce/Tez |
| 查询速度 | 快（秒级） | 慢（分钟级） |
| SQL 标准 | ANSI SQL | HiveQL |
| 实时性 | 实时查询 | 批处理 |
| 适用场景 | 交互式分析 | 批处理 ETL |

## 参考资源

- **官方文档**：https://prestodb.io/docs
- **GitHub 仓库**：https://github.com/prestodb/presto
- **DeepWiki**：https://deepwiki.com/prestodb/presto
- **社区论坛**：https://prestodb.slack.com
- **Stack Overflow**：搜索标签 `prestodb`

## 总结

Presto 是一个强大的分布式 SQL 查询引擎，为大数据分析提供了高性能、低延迟的查询能力。通过合理的配置和优化，Presto 可以成为企业数据分析平台的核心组件。无论是即席查询、BI 报表还是跨数据源分析，Presto 都能提供出色的性能和灵活性。

关键要点：
- ✅ 采用 Coordinator-Worker 架构，支持水平扩展
- ✅ 支持多种数据源，无需数据迁移
- ✅ 提供 ANSI SQL 标准支持，易于使用
- ✅ 支持分区剪枝、谓词下推等优化技术
- ✅ 提供完善的监控和安全功能

通过本文档的指导，您可以快速上手 Presto 并构建高效的数据分析平台。

---

*本文档基于 [Presto 官方 GitHub 仓库](https://github.com/prestodb/presto) 和 [DeepWiki 上的 Presto 页面](https://deepwiki.com/prestodb/presto) 编写，最后更新时间：2025-09-30*
